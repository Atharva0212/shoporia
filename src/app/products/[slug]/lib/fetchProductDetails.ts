import { getConnectionModel } from "@/src/lib/db/connection";
import { ProductDocument, ProductRecordData } from "@/src/lib/db/models/product.model";
import { PaginatedCursor, ProductDetails } from "../types";
import { UserDocument } from "@/src/lib/db/models/user.model";

export async function fetchProductDetails({ slug, userId }: { slug: ProductRecordData["slug"], userId: string | undefined }): Promise<{ success: true, data: ProductDetails } | { success: false, error: string, status: 404 | 500 }> {
    try {
        let canReviewProduct = false;
        await getConnectionModel("User");
        const Review = await getConnectionModel("Review");
        
        const Product = await getConnectionModel("Product");
        const productRecord = await Product.findOne<ProductDocument>({ slug }).populate({
            path: "reviews.review",
            populate: {
                path: "user",
                select: "name avatarBg _id"
            }
        }).lean();

        if (!productRecord) return { success: false, error: "The product that you are looking for doesnt exsists", status: 404 };
        if (userId) {
            const existingReview = await Review.findOne({ product: productRecord._id, user:userId })
            if (!existingReview) canReviewProduct = true
        }

        return { success: true, data: buildProduct({ productRecord, canReviewProduct }) }
    } catch (error) {
        console.error("Error fetching data", error);
        return { success: false, error: "Internal server error", status: 500 };
    }
}

function buildProduct({ productRecord, canReviewProduct }: { productRecord: ProductDocument, canReviewProduct: boolean }): ProductDetails {
    const { _id, name, slug, brand, category, subCategory, tags, variants, discount, images, rating, averageRating, reviews, reviewCount, badges } = productRecord;

    const record: ProductDetails = {
        id: _id.toString(),
        name,
        slug,
        brand,
        category,
        subCategory,
        tags,
        variants,
        discount,
        images: buildImageData({ images }),
        rating,
        averageRating,
        reviewData: buildReviewData({ reviews, reviewCount }),
        reviewCount,
        ...(badges ? { badges } : {}),
        canReviewProduct
    }
    return record;
}

function buildImageData({ images }: { images: ProductRecordData["images"] }): ProductDetails["images"] {
    return images.map(image => ({
        id: image._id.toString(),
        url: image.url,
        isPrimary: image.isPrimary,
    }))
}

function buildReviewData({ reviews, reviewCount }: { reviews: ProductDocument["reviews"], reviewCount: ProductDocument["reviewCount"] }): ProductDetails["reviewData"] {    
    const sortedReviews = [...reviews].sort(
        (a, b) => b.review.createdAt.getTime() - a.review.createdAt.getTime()
    )

    const lastReview = sortedReviews[sortedReviews.length - 1].review;

    const paginationState: PaginatedCursor = reviewCount > 5 ? { hasMore: true, cursor: { createdAt: lastReview.createdAt.getTime(), id: lastReview._id.toString() } } : { hasMore: false };
    return {
        data: reviews.map(reviewDoc => {
            const { _id, rating, user, comment, createdAt, replyCount } = reviewDoc.review;
            
            const { avatarBg, name } = user as UserDocument;
            return {
                reviewId: _id.toString(),
                rating,
                user: {
                    id: user._id.toString(),
                    avatarBg,
                    name: name,
                },
                comment,
                createdAt:createdAt.getTime(),
                hasReplies: replyCount > 0,
                replies: {
                    data: [],
                    hasFetched: false as const
                },
            }

        }),
        paginationState,
    }
}