import { sign, verify } from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";


export function createToken<T extends object>(
    payload: T,
    expiresInSeconds: number = parseInt(process.env.JWT_TOKEN_EXPIRY_SECONDS || "604800")
): string {
    const secretKey = process.env.JWT_SECRET as string;

    return sign(payload, secretKey, { expiresIn: expiresInSeconds });
}


export function verifyToken<T extends object>(token: string): { success: true } & T & JwtPayload | { success: false, error: "We couldn`t verify your session. Please log in again." } {
    try {
        const secretKey = process.env.JWT_SECRET as string;
        const decoded = verify(token, secretKey) as T & JwtPayload;
        return { success: true, ...decoded };
    } catch {
        return { success: false, error: "We couldn`t verify your session. Please log in again." };
    }
}

export type UserJwtPayload = { userId: string }

export function decodeUserToken(token: string) {
    return verifyToken<UserJwtPayload>(token)
}