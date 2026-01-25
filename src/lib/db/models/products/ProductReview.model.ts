import { Schema } from "mongoose";
import { ReviewDocument } from "../review.model";

export type ProductReviewRecordData = {
    review: ReviewDocument;
}

export const ReviewSchema = new Schema<ProductReviewRecordData>(
    {
        review: { type: Schema.Types.ObjectId, ref: "Review", required: true },
    },
    { _id: false }
);
