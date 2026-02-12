import { getConnectionModel } from "@/src/lib/db/connection";
import { createToken, UserJwtPayload, verifyToken } from "@/src/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE, EMAIL_VERIFICATION_COOKIE } from "../Constants/auth";
import { TempUserTokenPayload } from "../types";
import { LoginApiResponse } from "../types";
import { CookieOptions, setCookie } from "@/src/utils/cookies";
import { emailToColor } from "./utils/emailToColor";

export async function POST(req: NextRequest): Promise<NextResponse<LoginApiResponse>> {
    try {
        const token = req.cookies.get(EMAIL_VERIFICATION_COOKIE)?.value;
        if (!token) {
            return NextResponse.json<LoginApiResponse>(
                { success: false, error: "Your session expired. Please try again." },
                { status: 400 });
        }
        const verifiedToken = verifyToken<TempUserTokenPayload>(token);
        if (!verifiedToken.success) {
            return NextResponse.json<LoginApiResponse>(
                { success: false, error: "Your verification window closed. Please try again with a new code." },
                { status: 400 });
        }

        const { tempUserId } = verifiedToken;

        const { otp } = await req.json();

        if (!otp || String(otp).length !== 6) {
            return NextResponse.json<LoginApiResponse>(
                { success: false, error: "Invalid OTP." },
                { status: 400 });
        }
        const PendingUser = await getConnectionModel("PendingUser");
        const pendingUserRecord = await PendingUser.findById(tempUserId);
        if (!pendingUserRecord) {
            return NextResponse.json(
                { success: false, error: "User session expired. Please restart verification." },
                { status: 404 }
            );
        }

        if (pendingUserRecord.otp !== otp) {
            return NextResponse.json(
                { success: false, error: "Incorrect OTP." },
                { status: 401 }
            );
        }

        const User = await getConnectionModel("User");
        let user = await User.findOne({ email: pendingUserRecord.email });
        if (!user) {
            const { email } = pendingUserRecord;
            user = new User({
                email,
                avatarBg:emailToColor(email),
            });
            await user.save();
        }
        await pendingUserRecord.deleteOne();

        const userObjectId = user._id.toString();
        const authToken = createToken<UserJwtPayload>({ userId: userObjectId });

        const cookieOptions: CookieOptions = {
            maxAge: parseInt(process.env.JWT_TOKEN_EXPIRY_SECONDS || "604800"),
            name: AUTH_TOKEN_COOKIE,
            sameSite: "lax"
        }
        await setCookie(authToken, cookieOptions);

        return NextResponse.json(
            { success: true, userState: { isLoggedIn: true, userId: userObjectId, ...(user.name ? { userName: user.name } : {}), avatarBg: user.avatarBg } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error verifying otp", error);
        return NextResponse.json(
            { success: false, error: "Internal server error." },
            { status: 500 }
        );
    }
}