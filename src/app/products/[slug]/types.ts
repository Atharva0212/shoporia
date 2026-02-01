import { ProductRecordData } from "@/src/lib/db/models/product.model";
import { ImageRecordData } from "@/src/lib/db/models/products/ProductImage.model";
import { VariantRecordData } from "@/src/lib/db/models/products/ProductVariant.model";
import { MongooseObjectId } from "@/src/lib/db/types";
import { PaginatedResult } from "@/src/Types/types";

type FetchablePaginatedResult<T extends object> = { hasFetched: false, data: T[] } | { hasFetched: true } & PaginatedResult<T>;

export type RawReview = Omit<Review, "reviewId" | "replies" | "user" | "hasReplies"> & { _id: MongooseObjectId, user: Omit<Review["user"], "id"> & { _id: MongooseObjectId }, replyCount: number }

export type Review = {
    reviewId: string;
    user: {
        id: string;
        name: string;
        avatarBg: string;
    }
    rating: number;
    comment: string;
    createdAt: number;
    hasReplies: boolean;
    replies: FetchablePaginatedResult<Reply>;
};


export type PaginatedReview = PaginatedResult<Review>;

export type Reply = {
    id: string;
    userId: string;
    userName: string;
    avatarBg: string;
    comment: string;
    createdAt: number;
};

export type RawReply = Omit<Reply, "id"|"userId"|"createdAt"> & { _id: MongooseObjectId,userId:MongooseObjectId,createdAt:Date };

export type ProductDetails = {
    id: string,

    name: ProductRecordData["name"],
    slug: ProductRecordData["slug"],

    brand: ProductRecordData["brand"],
    category: ProductRecordData["category"],
    subCategory: ProductRecordData["subCategory"],
    tags: ProductRecordData["tags"],

    variants: VariantRecordData[],

    discount: ProductRecordData["discount"],

    images: (ImageRecordData & { id: string })[],

    rating: ProductRecordData["rating"],
    averageRating: ProductRecordData["averageRating"],
    reviewData: PaginatedReview,
    reviewCount: ProductRecordData["reviewCount"],

    badges?: ProductRecordData["badges"],

    canReviewProduct: boolean,
}

export type ReviewClient = Omit<Review, "replies"> & { replies: { pendingReply?: Omit<Reply, "createdAt">, list: Review["replies"] } };

type ReviewsState = { reviewData: PaginatedResult<ReviewClient> }

export type ProductDetailsClient = Omit<ProductDetails, "reviewData"> & { reviews: { pendingReview?: { clientReviewId: string } & Pick<Review, | "user" | "rating" | "comment"> } & ReviewsState };
