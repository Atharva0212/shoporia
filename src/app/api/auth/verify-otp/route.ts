import { getConnectionModel } from "@/src/lib/db/connection";
import { verifyToken } from "@/src/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import { EMAIL_VERIFICATION_COOKIE } from "../Constants/auth";
import { TempUserTokenPayload } from "../types";
import { RedirectApiResponse } from "./types";

export async function POST(req: NextRequest): Promise<NextResponse<RedirectApiResponse>> {
    try {
        const token = req.cookies.get(EMAIL_VERIFICATION_COOKIE)?.value;
        if (!token) {
            return NextResponse.json<RedirectApiResponse>(
                { success: false, error: "Your session expired. Please try again." },
                { status: 400 });
        }
        const verifiedToken = verifyToken<TempUserTokenPayload>(token);
        if (!verifiedToken.success) {
            return NextResponse.json<RedirectApiResponse>(
                { success: false, error: "Your verification window closed. Please try again with a new code." },
                { status: 400 });
        }

        const { tempUserId } = verifiedToken;
        
        const { otp } = await req.json();
        
        if (!otp || String(otp).length !== 6) {
            return NextResponse.json<RedirectApiResponse>(
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
console.log(pendingUserRecord.otp);
console.log(otp);

        if (pendingUserRecord.otp!==otp) {
            return NextResponse.json(
                { success: false, error: "Incorrect OTP." },
                { status: 401 }
            );
        }

        const User = await getConnectionModel("User");
        const newUserRecord = new User({
            email: pendingUserRecord.email,
        })
        await newUserRecord.save();
        await pendingUserRecord.deleteOne();
        return NextResponse.json(
            { success: true, redirect: "/" },
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