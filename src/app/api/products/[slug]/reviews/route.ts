import { PaginatedReview, RawReview } from "@/src/app/products/[slug]/types";
import { getConnectionModel } from "@/src/lib/db/connection";
import { DataApiResponse } from "@/src/Types/response";
import { toMongoObjectId } from "@/src/utils/objectId";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../../../auth/Constants/auth";
import { verifyUserToken } from "@/src/utils/jwt";
import { ProductRecordData } from "@/src/lib/db/models/product.model";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<DataApiResponse<PaginatedReview>>> {
    try {
        const { slug: productId } = await params;
        const Product = await getConnectionModel("Product");

        const productRecord = await Product.findById(productId);

        if (!productRecord) {
            return NextResponse.json({ success: false, error: "xyz" }, { status: 404 });
        }
        const url = new URL(req.url);
        const createdAtStr = url.searchParams.get("createdAt");
        const createdAt = createdAtStr ? new Date(Number(createdAtStr)) : new Date();
        
        const id = url.searchParams.get("id");
        const paginatedReviews = await fetchPaginatedReviews({ productId, createdAt, id });
        return NextResponse.json({ success: true, responseData: paginatedReviews }, { status: 200 });
    } catch (error) {
        console.error("Error fetching reviews", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });

    }
}

async function fetchPaginatedReviews({ productId, createdAt, id }: { productId: string, createdAt: Date, id: string | null }): Promise<PaginatedReview> {
    const REVIEWS_PAGE_SIZE = 10;
    const paginationFilter = id ? { _id: { $lt: toMongoObjectId(id) } } : {};

    const Review = await getConnectionModel("Review");

    const aggregatedReviews = await Review.aggregate<RawReview>([
        {
            $match: { product: toMongoObjectId(productId), createdAt: { $lt: createdAt }, ...paginationFilter },
        }, {
            $sort: { createdAt: -1, _id: 1 },
        }, {
            $limit: REVIEWS_PAGE_SIZE,
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: "$user",
        },
        {
            $project: {
                _id: 1,
                user: {
                    _id: 1,
                    name: 1,
                    avatarBg:1,
                },
                rating: 1,
                comment: 1,
                replyCount: 1,
                createdAt: 1,
            },
        },
    ])

    return buildPaginatedReviews({ aggregatedReviews, REVIEWS_PAGE_SIZE });
}

function buildPaginatedReviews({ aggregatedReviews, REVIEWS_PAGE_SIZE }: { aggregatedReviews: RawReview[], REVIEWS_PAGE_SIZE: number }): PaginatedReview {
    if (aggregatedReviews.length === 0) {
        return {
            data: [],
            paginationState: {
                hasMore: false
            }
        }
    }
    const reviews: PaginatedReview["data"] = aggregatedReviews.map(review => {
        const { _id, user, rating, comment, replyCount, createdAt } = review;
        return {
            reviewId: _id.toString(),
            user: {
                id: user._id.toString(),
                name: user.name,
                avatarBg: user.avatarBg,
            },
            rating,
            comment,
            hasReplies: replyCount > 0,
            createdAt,
            replies: { hasFetched: false, data: [] }
        }
    });
    const lastReview = reviews[reviews.length - 1];

    return {
        data: reviews,
        paginationState: {
            cursor: {
                createdAt: lastReview.createdAt,
                id: lastReview.reviewId,
            },
            hasMore: reviews.length === REVIEWS_PAGE_SIZE,
        }
    }
}

type CreateReviewResponse = {
    reviewId: string,
    averageRating: number,
}

export type CreateReviewApiResponse = DataApiResponse<CreateReviewResponse>;

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<CreateReviewApiResponse>> {
    try {
        const token = req.cookies.get(AUTH_TOKEN_COOKIE)?.value;
        if (!token) {
            return NextResponse.json({ success: false, error: "Please log in to post a review." }, { status: 401 })
        }
        const tokenResult = verifyUserToken(token);
        if (!tokenResult.success) {
            return NextResponse.json({ success: false, error: "Your session has expired. Please log in again." }, { status: 401 })
        }
        const { userId } = tokenResult;
        const { slug: productId } = await params;

        const Review = await getConnectionModel("Review");

        const productObjectId = toMongoObjectId(productId);
        const userObjectId = toMongoObjectId(userId);
        
        const existingReview = await Review.findOne({ product: productObjectId, user: userObjectId });
        if (existingReview) {
            return NextResponse.json(
                { success: false, error: "You already reviewed this product." },
                { status: 403 }
            );
        }

        const { rating, comment }: { rating: number, comment: string } = await req.json();
        if (rating < 0 || rating > 5 || comment.length < 2) {
            return NextResponse.json({ success: false, error: "Rating must be between 0 and 5 and comment must be at least 2 characters" }, { status: 400 })
        }

        const Product = await getConnectionModel("Product");

        const productRecord = await Product.findById(productId);
        if (!productRecord) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
        };

        const newReview = await Review.create({
            product: productObjectId,
            user: userObjectId,
            rating,
            comment,
        });
        const ratingDistribution = productRecord.ratingDistribution.distribution;

        const updatedRatingDistribution = updateRatingDistribution({ ratingDistribution, rating });

        const updatedReviewCount = productRecord.reviewCount + 1;

        const updatedAverageRating = calculateUpdatedAverageRating({ ratingDistribution: updatedRatingDistribution, totalRatingsCount: updatedReviewCount });
        
        await Product.findByIdAndUpdate(productId, {
            $set: {
                ratingDistribution: { distribution: updatedRatingDistribution },
                reviewCount: updatedReviewCount,
                averageRating: updatedAverageRating,
            },
            $push: {
                reviews: {
                    $each: [{ review: newReview._id, createdAt: new Date() }],
                    $sort: { createdAt: -1 },
                    $slice: 5,
                },
            },
        },{ new: true });

        return NextResponse.json({ success: true, responseData: { reviewId: newReview._id.toString(), averageRating: updatedAverageRating } }, { status: 201 });
    } catch (error) {
        console.error("Error inserting review:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

function updateRatingDistribution({ ratingDistribution, rating }: { ratingDistribution: ProductRecordData["ratingDistribution"]["distribution"], rating: number }) {
    return {
        ...ratingDistribution,
        [rating]: (ratingDistribution[rating] += 1),
    };
}

function calculateWeightedRatingSum(ratingCounts: ProductRecordData["ratingDistribution"]["distribution"]) {
    return Object.entries(ratingCounts).reduce((totalScore, [rating, count]) => {
        return totalScore + Number(rating) * count;
    }, 0);
}

function calculateUpdatedAverageRating({ ratingDistribution, totalRatingsCount }: { ratingDistribution: ProductRecordData["ratingDistribution"]["distribution"], totalRatingsCount: number }) {
    const weightedRatingSum = calculateWeightedRatingSum(ratingDistribution);
    return weightedRatingSum / totalRatingsCount;
}
