import { AUTH_TOKEN_COOKIE } from "@/src/app/api/auth/Constants/auth";
import { PaginatedResult, RawReply, Reply } from "@/src/app/products/[slug]/types";
import { getConnectionModel } from "@/src/lib/db/connection";
import { DataApiResponse, MessageApiResponse } from "@/src/Types/response";
import { verifyUserToken } from "@/src/utils/jwt";
import { toMongoObjectId } from "@/src/utils/objectId";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<DataApiResponse<PaginatedResult<Reply>>>> {
    try {
        const { slug: reviewId } = await params;

        const Review = await getConnectionModel("Review");

        const reviewRecord = await Review.findById(reviewId);

        if (!reviewRecord) {
            return NextResponse.json({ success: false, error: "xyz" }, { status: 404 });
        }

        const url = new URL(req.url);
        const createdAtStr = url.searchParams.get("createdAt");
        const createdAt = createdAtStr ? new Date(createdAtStr) : new Date();
        const id = url.searchParams.get("id");
        const paginatedReviews = await fetchPaginatedReplies({ reviewId, createdAt, id });
        return NextResponse.json({ success: true, responseData: paginatedReviews }, { status: 200 });

    } catch (error) {
        console.error("Error fetching replies", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
}

async function fetchPaginatedReplies({ reviewId, createdAt, id }: { reviewId: string, createdAt: Date, id: string | null }): Promise<PaginatedResult<Reply>> {
    const REPLIES_PAGE_SIZE = 10;
    const paginationFilter = id ? { _id: { $lt: toMongoObjectId(id) } } : {};

    const Reply = await getConnectionModel("Reply");

    const aggregatedReplies = await Reply.aggregate<RawReply>([
        {
            $match: { review: toMongoObjectId(reviewId), createdAt: { $lt: createdAt }, ...paginationFilter },
        },
        {
            $sort: { createdAt: -1, _id: 1 },
        },
        {
            $limit: REPLIES_PAGE_SIZE,
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
            $unwind: "$user"
        },
        {
            $project: {
                _id: 1,
                userName: "$user.name",
                avatarBg: "$user.avatar.bg",
                comment: 1,
                createdAt: 1,
            }
        }
    ]);

    return buildPaginatedReplies({ aggregatedReplies, REPLIES_PAGE_SIZE });
}

function buildPaginatedReplies({ aggregatedReplies, REPLIES_PAGE_SIZE }: { aggregatedReplies: RawReply[], REPLIES_PAGE_SIZE: number }): PaginatedResult<Reply> {
    if (aggregatedReplies.length === 0) {
        return {
            data: [],
            paginationState: {
                hasMore: false
            }
        }
    }

    const replies: PaginatedResult<Reply>["data"] = aggregatedReplies.map(reply => {
        const { _id, userName, avatarBg, comment, createdAt } = reply;
        return {
            id: _id.toString(),
            userName,
            avatarBg,
            comment,
            createdAt,
        }
    });

    const lastReply = replies[replies.length - 1];

    return {
        data: replies,
        paginationState: {
            cursor: {
                createdAt: lastReply.createdAt,
                lastId: lastReply.id,
            },
            hasMore: replies.length === REPLIES_PAGE_SIZE,
        }
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<MessageApiResponse>> {
    try {
        const token = req.cookies.get(AUTH_TOKEN_COOKIE)?.value;
        if (!token) {
            return NextResponse.json({ success: false, error: "Please log in to post a reply." }, { status: 401 })
        }
        const tokenResult = verifyUserToken(token);
        if (!tokenResult.success) {
            return NextResponse.json({ success: false, error: "Your session has expired. Please log in again." }, { status: 401 })
        }
        const { userId } = tokenResult;
        const { slug: reviewId } = await params;

        const { rating, comment }: { rating: number, comment: string } = await req.json();
        if (rating < 0 || rating > 5 || comment.length < 2) {
            return NextResponse.json({ success: false, error: "Rating must be between 0 and 5 and comment must be at least 2 characters" }, { status: 400 })
        }
        const Review = await getConnectionModel("Review");
        const Reply = await getConnectionModel("Reply");

        await Review.findByIdAndUpdate(reviewId, {
            $inc: { replyCount: 1 },
        });

        await Reply.create({
            review: toMongoObjectId(reviewId),
            user: toMongoObjectId(userId),
            comment,
        });
        return NextResponse.json({ success: true, message: "Reply added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error inserting reply:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}