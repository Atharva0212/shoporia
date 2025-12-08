import { MessageApiResponse } from "@/src/Types/response";
import { verifyToken } from "@/src/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import { EMAIL_VERIFICATION_COOKIE } from "../Constants/auth";
import { TempUserTokenPayload } from "../types";
import { getConnectionModel } from "@/src/lib/db/connection";
import { generateOTP } from "../send-otp/utils/generateOTP";
import { EmailService } from "@/src/lib/email/email.service";
import { generateVerificationEmail } from "../send-otp/utils/verificationEmail";

export async function GET(req: NextRequest): Promise<NextResponse<MessageApiResponse>> {
    try {
        const token = req.cookies.get(EMAIL_VERIFICATION_COOKIE)?.value;
        if (!token) {
            return NextResponse.json<MessageApiResponse>(
                { success: false, error: "Your session expired. Please try again." },
                { status: 400 });
        }
        const verifiedToken = verifyToken<TempUserTokenPayload>(token);
        if (!verifiedToken.success) {
            return NextResponse.json<MessageApiResponse>(
                { success: false, error: "Your verification window closed. Please try again with a new code." },
                { status: 400 });
        }

        const { tempUserId } = verifiedToken;

        const PendingUser = await getConnectionModel("PendingUser");
        const pendingUserRecord = await PendingUser.findById(tempUserId);
        if (!pendingUserRecord) {
            return NextResponse.json(
                { success: false, error: "User session expired. Please restart verification." },
                { status: 404 }
            );
        }

        const otp = generateOTP();
        pendingUserRecord.otp = otp;
        await pendingUserRecord.save();

        const emailService = EmailService.getInstance();
        const { subject, html } = generateVerificationEmail(otp);
        const emailResponse = await emailService.sendEmail(pendingUserRecord.email, subject, html);
        if (!emailResponse.success) {
            return NextResponse.json<MessageApiResponse>({ success: true, message: emailResponse.error }, { status: 500 });
        }
        return NextResponse.json<MessageApiResponse>({ success: true, message: "Otp re-sent successfully!" }, { status: 200 });
    }
    catch (error) {
        console.error("Error re-sending otp", error);
        return NextResponse.json<MessageApiResponse>({ success: false, error: "Internal server error." }, { status: 500 })
    }
}