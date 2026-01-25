import mongoose, { Schema } from "mongoose";
import { BaseDocument, MongooseObjectId } from "../types";
import { reviewModelName } from "./review.model";
import { userModelName } from "./user.model";

type ReplyRecordData = {
    review: MongooseObjectId;
    user: MongooseObjectId;
    comment: string;
    createdAt:Date;
}

export type ReplyDocument = BaseDocument<ReplyRecordData>;

export const ReplySchema = new Schema<ReplyDocument>(
    {
        review: { type: Schema.Types.ObjectId, ref: reviewModelName, required: true },
        user: { type: Schema.Types.ObjectId, ref: userModelName, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default:Date.now },
    },
);

export const replyModelName = "Reply";

export const Reply = mongoose.models.Reply ?? mongoose.model<ReplyDocument>(replyModelName, ReplySchema);
