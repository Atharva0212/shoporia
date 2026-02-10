import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE, OAUTH_PKCE_VERIFIER_COOKIE, OAUTH_STATE_COOKIE } from "../../Constants/auth";
import { LoginApiResponse } from "../../types";
import { verifyGoogleIdToken } from "./utils/verifyGoogleIdToken";
import { getConnectionModel } from "@/src/lib/db/connection";
import { emailToColor } from "../../verify-otp/utils/emailToColor";
import { CookieOptions, setCookie } from "@/src/utils/cookies";
import { createToken, UserJwtPayload } from "@/src/utils/jwt";

export async function GET(req: NextRequest): Promise<NextResponse<LoginApiResponse>|NextResponse> {
    try {

        const cookieState = req.cookies.get(OAUTH_STATE_COOKIE)?.value;
        const pkceCodeVerifier = req.cookies.get(OAUTH_PKCE_VERIFIER_COOKIE)?.value;

        if (!pkceCodeVerifier) {
            return NextResponse.json({ success: false, error: "Login session expired. Please try again." }, { status: 400 });
        }
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");
        if (!code) {
            return NextResponse.json({ success: false, error: "Google login failed. Please try again." }, { status: 400 });
        }
        const state = searchParams.get("state");
        if (!state) {
            return NextResponse.json(
                { success: false, error: "Login could not be verified. Please try again." },
                { status: 400 }
            );
        }

        if (!cookieState) {
            return NextResponse.json(
                { success: false, error: "Login session expired. Please try again." },
                { status: 400 }
            );
        }

        if (state !== cookieState) {
            return NextResponse.json(
                { success: false, error: "Login verification failed. Please try again." },
                { status: 400 }
            );
        }
        const body = new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!, // omit if PKCE public client
            code,
            code_verifier: pkceCodeVerifier,
            grant_type: "authorization_code",
            redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        });

        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            cache: "no-cache",
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
        });

        const tokens = await tokenRes.json();
        const { email, name } = await verifyGoogleIdToken(tokens.id_token)
        if (!email) {
            return NextResponse.json({ success: false, error: "Email not found" }, { status: 400 });
        }
        const User = await getConnectionModel("User");
        const userRecord = await User.findOne({ email });
        let userObjectId;
        let avatarBg;
        if (userRecord) {
            userObjectId = userRecord._id.toString();
            avatarBg = userRecord.avatarBg;
        } else {
            avatarBg = emailToColor(email);
            const newUser = new User({
                email,
                avatarBg,
                name,
            });
            const newUserRecord = await newUser.save();
            userObjectId = newUserRecord._id.toString();
        }

        const authToken = createToken<UserJwtPayload>({ userId: userObjectId });

        const cookieOptions: CookieOptions = {
            maxAge: parseInt(process.env.JWT_TOKEN_EXPIRY_SECONDS || "604800"),
            name: AUTH_TOKEN_COOKIE,
            sameSite: "lax"
        }
        await setCookie(authToken, cookieOptions);

        
        return NextResponse.redirect(req.nextUrl.origin);
    } catch {
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }


}