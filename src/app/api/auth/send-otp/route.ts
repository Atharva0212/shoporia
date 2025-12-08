import { getConnectionModel } from "@/src/lib/db/connection";
import { ExtendedMessageApiResponse } from "@/src/Types/response";
import { parseMongooseValidationError } from "@/src/utils/parseValidationError";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { generateOTP } from "./utils/generateOTP";
import { createToken } from "@/src/utils/jwt";
import { TempUserTokenPayload } from "../types";
import { CookieOptions, setCookie } from "@/src/utils/cookies";
import { EMAIL_VERIFICATION_COOKIE } from "../Constants/auth";
import { EmailService } from "@/src/lib/email/email.service";
import { generateVerificationEmail } from "./utils/verificationEmail";

export async function POST(req: NextResponse): Promise<NextResponse<ExtendedMessageApiResponse>> {
    try {
        const { email } = await req.json();

        const User = await getConnectionModel("User");

        const exisistingUser = await User.findOne({ email });
        if (exisistingUser) {
            return NextResponse.json<ExtendedMessageApiResponse>({ success: true, message: "User already exsists" }, { status: 409 });
        }
        const PendingUser = await getConnectionModel("PendingUser");
        const otp = generateOTP();
        const pendingUser = new PendingUser({
            email,
            otp,
        })
        const savedPendingUser = await pendingUser.save();
        const payload = { tempUserId: savedPendingUser._id.toString() };

        const token = createToken<TempUserTokenPayload>(payload);
console.log(token);

        const cookieOptions: CookieOptions = {
            maxAge: 300,// 5 mins
            name: EMAIL_VERIFICATION_COOKIE,
            sameSite: "strict"
        }
        await setCookie(token, cookieOptions);

        const emailService = EmailService.getInstance();
        const { subject, html } = generateVerificationEmail(otp);
        const emailResponse = await emailService.sendEmail(email, subject, html);
        if (!emailResponse.success) {
            return NextResponse.json<ExtendedMessageApiResponse>({ success: true, message: emailResponse.error }, { status: 500 });
        }
        return NextResponse.json<ExtendedMessageApiResponse>({ success: true, message: "Otp sent successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error sending otp",error);
        
        if (error instanceof mongoose.Error.ValidationError) {
            const validationError = parseMongooseValidationError(error);
            return NextResponse.json<ExtendedMessageApiResponse>({ success: false, validationError }, { status: 422 })
        }
        return NextResponse.json<ExtendedMessageApiResponse>({ success: false, error: "Internal server error." }, { status: 500 })
    }
}