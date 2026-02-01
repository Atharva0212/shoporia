import { Schema } from "mongoose";
import { ReviewDocument } from "../review.model";

export type ProductReviewRecordData = {
    review: ReviewDocument;
    createdAt: Date;
}

export const ReviewSchema = new Schema<ProductReviewRecordData>(
    {
        review: {
            type: Schema.Types.ObjectId,
            ref: "Review",
            required: true,
        },
        createdAt: { type: Date, default: new Date },
    },
    { _id: false }
);