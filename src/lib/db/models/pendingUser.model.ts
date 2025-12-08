import mongoose, { Schema } from "mongoose";
import { BaseDocument } from "../types";

type PendingUserRecordData = {
    email: string;
    otp: string;
    isVerified: boolean;
}

export type PendingUserDocument = BaseDocument<PendingUserRecordData>;

const documentTTLSec = process.env.EMAIL_VERIFICATION_DOCUMENT_TTL_SEC ?? 300; //5 mins

export const PendingUserSchema = new Schema<PendingUserDocument>({
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: (v: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v ?? ""),
            message: (props: { value: string }) => `${props.value ?? "Invalid"} is not a valid email address!`,
        }
    },
    otp: {
        type: String,
        minlength: 6,
        maxlength: 6,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true,expires:documentTTLSec });

export const pendingUserModelName = "PendingUser";

export const PendingUser = mongoose.models.PendingUser ?? mongoose.model<PendingUserDocument>(pendingUserModelName, PendingUserSchema);