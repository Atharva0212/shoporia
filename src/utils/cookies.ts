import { cookies } from "next/headers";

export type CookieOptions = {
    name: string;
    maxAge: number;
    sameSite?: "strict" | "lax";
};

export async function setCookie(cookieValue: string, options: CookieOptions) {
    const cookieStore = await cookies();
    const { name, maxAge, sameSite = "lax" } = options;

    cookieStore.set({
        name,
        value: cookieValue,
        httpOnly: true,
        maxAge,
        sameSite,
        secure: process.env.NODE_ENV === "production",
    });
}
