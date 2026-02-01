import { AUTH_TOKEN_COOKIE } from "@/src/app/api/auth/Constants/auth";
import { RawReply, Reply } from "@/src/app/products/[slug]/types";
import { getConnectionModel } from "@/src/lib/db/connection";
import { DataApiResponse } from "@/src/Types/response";
import { PaginatedResult } from "@/src/Types/types";
import { verifyUserToken } from "@/src/utils/jwt";
import { toMongoObjectId } from "@/src/utils/objectId";
import { parseNumber } from "@/src/utils/parseNumber";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<DataApiResponse<PaginatedResult<Reply>>>> {
    try {
        const { slug: reviewId } = await params;

        const Review = await getConnectionModel("Review");

        const reviewRecord = await Review.findById(reviewId);

        if (!reviewRecord) {
            return NextResponse.json({ success: false, error: "xyz" }, { status: 404 });
        }

        const { searchParams } = new URL(req.url);
        const createdAtStr = searchParams.get("createdAt");
        const createdAtTimestamp = parseNumber<null>(createdAtStr, null);
        const createdAt = createdAtTimestamp ? new Date(createdAtTimestamp) : new Date();
        const id = searchParams.get("id");
        const paginatedReviews = await fetchPaginatedReplies({ reviewId, createdAt, id });
        return NextResponse.json({ success: true, responseData: paginatedReviews }, { status: 200 });

    } catch (error) {
        console.error("Error fetching replies", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
}

async function fetchPaginatedReplies({ reviewId, createdAt, id }: { reviewId: string, createdAt: Date, id: string | null }): Promise<PaginatedResult<Reply>> {
    const REPLIES_PAGE_SIZE = 2;
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
                userId: "$user._id",
                userName: "$user.name",
                avatarBg: "$user.avatarBg",
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
        const { _id, userId, userName, avatarBg, comment, createdAt } = reply;
        return {
            id: _id.toString(),
            userId: userId.toString(),
            userName,
            avatarBg,
            comment,
            createdAt: createdAt.getTime(),
        }
    });

    const lastReply = replies[replies.length - 1];

    return {
        data: replies,
        paginationState: {
            cursor: {
                createdAt: lastReply.createdAt,
                id: lastReply.id,
            },
            hasMore: replies.length === REPLIES_PAGE_SIZE,
        }
    }
}

type CreateReplyResponse = {
    replyId: string
}

export type CreateReplyApiResponse = DataApiResponse<CreateReplyResponse>;

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<CreateReplyApiResponse>> {
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

        const { comment }: { comment: string } = await req.json();
        if (comment.length < 2) {
            return NextResponse.json({ success: false, error: "Comment must be at least 2 characters" }, { status: 400 })
        }
        const Review = await getConnectionModel("Review");
        const Reply = await getConnectionModel("Reply");

        await Review.findByIdAndUpdate(reviewId, {
            $inc: { replyCount: 1 },
        });

        const newReply = await Reply.create({
            review: toMongoObjectId(reviewId),
            user: toMongoObjectId(userId),
            comment,
        });
        return NextResponse.json({ success: true, responseData: { replyId: newReply._id.toString() } }, { status: 201 });
    } catch (error) {
        console.error("Error inserting reply:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}