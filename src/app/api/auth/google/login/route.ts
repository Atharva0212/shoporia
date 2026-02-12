import { DataApiResponse } from "@/src/Types/response";
import { CookieOptions, setCookie } from "@/src/utils/cookies";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { OAUTH_PKCE_VERIFIER_COOKIE, OAUTH_STATE_COOKIE } from "../../Constants/auth";

export function generateCodeVerifier() {
    return crypto.randomBytes(32).toString("base64url");
}

export function generateCodeChallenge(verifier: string) {
    return crypto
        .createHash("sha256")
        .update(verifier)
        .digest("base64url");
}

export type GoogleLoginResponse =DataApiResponse<{ url: string }>;

export async function GET(): Promise<NextResponse<GoogleLoginResponse>> {
    try {
        const pkceCodeVerifier = generateCodeVerifier();
        const pkceCodeChallenge = generateCodeChallenge(pkceCodeVerifier);
        const pkceVerifierCookieOptions: CookieOptions = {
            maxAge: 300,// 5 mins
            name: OAUTH_PKCE_VERIFIER_COOKIE,
            sameSite: "lax"
        }
        await setCookie(pkceCodeVerifier, pkceVerifierCookieOptions);

        const oauthState = crypto.randomUUID();
        const oauthStateCookieOptions: CookieOptions = {
            maxAge: 300,// 5 mins
            name: OAUTH_STATE_COOKIE,
            sameSite: "lax"
        }
        await setCookie(oauthState, oauthStateCookieOptions);

        const params = new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
            response_type: "code",
            scope: "openid email profile",

            code_challenge: pkceCodeChallenge,
            code_challenge_method: "S256",

            state: oauthState,
        });

        return NextResponse.json({ success: true, responseData: { url: "https://accounts.google.com/o/oauth2/v2/auth?" + params.toString() } })
    } catch {
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}