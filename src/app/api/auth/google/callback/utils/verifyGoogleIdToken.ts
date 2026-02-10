import { jwtVerify, createRemoteJWKSet } from "jose";

const GOOGLE_JWKS = createRemoteJWKSet(
    new URL("https://www.googleapis.com/oauth2/v3/certs")
);

export async function verifyGoogleIdToken(idToken: string) {
    const { payload } = await jwtVerify(idToken, GOOGLE_JWKS, {
        issuer: ["https://accounts.google.com", "accounts.google.com"],
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    if (!payload.sub) {
        throw new Error("Missing sub in ID token");
    }

    if (payload.email && payload.email_verified === false) {
        throw new Error("Email not verified");
    }

    return {
        googleUserId: payload.sub,
        email: payload.email as string | undefined,
        name: payload.name as string | undefined,
        picture: payload.picture as string | undefined,
    };
}