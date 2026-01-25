import mongoose, { Schema } from "mongoose";
import { BaseDocument, MongooseObjectId } from "../types";
import { productModelName, ProductRecordData } from "./product.model";
import { UserDocument, userModelName } from "./user.model";

export type ReviewRecordData = {
    productId: MongooseObjectId |ProductRecordData;
    user: UserDocument;
    rating: number;
    comment: string;
    replyCount: number;
}

export type ReviewDocument = BaseDocument<ReviewRecordData>;

export const ReviewSchema = new Schema<ReviewDocument>(
    {
        productId: { type: Schema.Types.ObjectId, ref: productModelName, required: true },
        user: { type: Schema.Types.ObjectId, ref: userModelName, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String },
        replyCount: { type: Number, default: 0 } 
    },
    {
        timestamps: true
    }
);

ReviewSchema.index({ productId: 1, userId: 1 });

export const reviewModelName = "Review"

export const Review = mongoose.models.Review ?? mongoose.model<ReviewDocument>(reviewModelName, ReviewSchema);
console.log("relkjasf;lkj");
