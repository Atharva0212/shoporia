import { ProductRecordData } from "@/src/lib/db/models/product.model";
import { ImageRecordData } from "@/src/lib/db/models/products/ProductImage.model";
import { VariantRecordData } from "@/src/lib/db/models/products/ProductVariant.model";

export type PaginatedCursor = {
    hasMore: true, cursor: {
        lastId: string;
        createdAt: Date;
    }
} | { hasMore: false };

export type PaginatedResult<T extends object> = {
    paginationState: PaginatedCursor;
    data: T[];
};

type FetchablePaginatedResult<T extends object> = { hasFetched: false, data: T[] } | { hasFetched: true } & PaginatedResult<T>;

export type Review = {
    reviewId: string;
    user: {
        id: string;
        name: string;
        avatarBg: string;
    }
    rating: number;
    comment: string;
    createdAt: Date;
    repliesCount: number;
    replies: FetchablePaginatedResult<Reply>;
};


export type PaginatedReview = PaginatedResult<Review>;

export type Reply = {
    id: string;
    userName: string;
    avatarBg: string;
    comment: string;
    createdAt: Date;
};

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

    images: (ImageRecordData&{id:string})[],

    rating: ProductRecordData["rating"],
    averageRating: ProductRecordData["averageRating"],
    reviewData: PaginatedReview,
    reviewCount: ProductRecordData["reviewCount"],

    badges?: ProductRecordData["badges"],

    canReviewProduct:boolean,
}

