import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../Constants/auth";
import { MessageApiResponse } from "@/src/Types/response";
import { verifyUserToken } from "@/src/utils/jwt";
import { getConnectionModel } from "@/src/lib/db/connection";

export async function PATCH(req: NextRequest): Promise<NextResponse<MessageApiResponse>> {
    try {
        const token = req.cookies.get(AUTH_TOKEN_COOKIE)?.value;
        if (!token) {
            return NextResponse.json({ success: false, error: "Please log in to update profile." }, { status: 401 })
        }
        const tokenResult = verifyUserToken(token);
        if (!tokenResult.success) {
            return NextResponse.json({ success: false, error: "Your session has expired. Please log in again." }, { status: 401 })
        }
        const { userId } = tokenResult;
        const { name } = await req.json();
        const User = await getConnectionModel("User")
        await User.findByIdAndUpdate(userId, { $set: { name } })
        return NextResponse.json({ success: true, message: "Profile updated successfully" }, { status: 200 });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
}