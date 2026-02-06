import { DataApiResponse } from "@/src/Types/response";
import { CreateReviewApiResponse } from "@/src/app/api/products/[slug]/reviews/route";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginatedReview, ProductDetails, ProductDetailsClient, Reply, Review, ReviewClient } from "../types";
import { CreateReplyApiResponse } from "@/src/app/api/products/reviews/[slug]/replies/route";
import { PaginatedResult } from "@/src/Types/types";

type CreateReviewPayload = {
    slug: string;
    productId: string;
    rating: number;
    comment: string;
    user: Review["user"];
};

type CreateReplyPayload = {
    slug: string;
    reviewId: string;
    comment: string;
    user: Review["user"];
};

type LoadMoreRepliesParams = {
    slug: string,
    reviewId: string,
    params?: {
        createdAt: number,
        id: string
    }
}


export const productApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/products',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getProductBySlug: builder.query<ProductDetailsClient, string, DataApiResponse<ProductDetails>>({
            query(slug) {
                return `/${slug}`;
            },
            transformResponse(baseQueryReturnValue) {
                if (!baseQueryReturnValue.success) {
                    throw new Error(baseQueryReturnValue.error);
                };
                return {
                    ...baseQueryReturnValue.responseData,
                    reviews: {
                        reviewData: {
                            data: baseQueryReturnValue.responseData.reviewData.data.map(d => ({
                                ...d,
                                replies: {
                                    list: d.replies,
                                }
                            })),
                            paginationState: baseQueryReturnValue.responseData.reviewData.paginationState
                        },
                    }
                };
            },
        }),
        createReview: builder.mutation<CreateReviewApiResponse, CreateReviewPayload>({
            query(args) {
                const { productId, rating, comment } = args;
                return {
                    url: `/${productId}/reviews`,
                    method: "POST",
                    body: { rating, comment },
                }
            },
            async onQueryStarted(queryArgument, { dispatch, queryFulfilled }) {
                const { slug, rating, comment, user } = queryArgument;
                const clientReviewId = crypto.randomUUID();
                const patchRequest = dispatch(productApi.util.updateQueryData("getProductBySlug", slug, (draft) => {
                    draft.reviews.pendingReview = {
                        clientReviewId,
                        rating,
                        comment,
                        user,
                    }
                }));
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        const { reviewId, averageRating } = data.responseData;
                        dispatch(
                            productApi.util.updateQueryData(
                                "getProductBySlug",
                                slug,
                                (draft) => {
                                    draft.canReviewProduct=false;
                                    draft.averageRating = averageRating;
                                    draft.reviews.pendingReview = undefined;

                                    draft.reviews.reviewData.data.unshift({
                                        reviewId,
                                        user,
                                        rating,
                                        comment,
                                        createdAt: new Date().getTime(),
                                        hasReplies: false,
                                        replies: {
                                            list: {
                                                hasFetched: true,
                                                data: [],
                                                paginationState: { hasMore: false },
                                            },
                                        },
                                    });
                                }
                            )
                        );

                    }
                } catch (error) {
                    patchRequest.undo();
                    throw error
                }
            },
        }),
        loadMoreReviews: builder.mutation<DataApiResponse<PaginatedReview>, { productId: string, slug: string, params?: { createdAt: number, id: string } }>({
            query(args) {
                const { productId, params } = args
                return {
                    url: `/${productId}/reviews`,
                    method: "GET",
                    params,
                };
            },
            async onQueryStarted({ slug }, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        const { data: newReviewData, paginationState } = data.responseData;
                        dispatch(productApi.util.updateQueryData("getProductBySlug", slug, (draft) => {
                            const reviewClients: ReviewClient[] = newReviewData.map(review => ({
                                ...review,
                                replies: {
                                    list: review.replies,
                                }
                            }))
                            const existingReviews = draft.reviews.reviewData.data ?? [];
                            draft.reviews.reviewData.data = getUniqueReviews({ existingReviews, newReviews: reviewClients });
                            draft.reviews.reviewData.paginationState = paginationState;
                        }))
                    }
                } catch (error) {
                    throw error
                }
            },
        }),
        createReply: builder.mutation<CreateReplyApiResponse, CreateReplyPayload>({
            query(args) {
                const { reviewId, comment } = args;
                return {
                    url: `/reviews/${reviewId}/replies`,
                    method: "POST",
                    body: { comment }
                }
            },
            async onQueryStarted({ slug, reviewId, comment, user }, { dispatch, queryFulfilled }) {
                const replyId = crypto.randomUUID();
                const patchRequest = dispatch(productApi.util.updateQueryData("getProductBySlug", slug, (draft) => {
                    const review = draft.reviews.reviewData.data.find(r => r.reviewId === reviewId);
                    if (!review) return;
                    review.replies.pendingReply = {
                        id: replyId,
                        comment,
                        userId:user.id,
                        avatarBg: user.avatarBg,
                        userName: user.name
                    }
                }))
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        const { replyId } = data.responseData;
                        dispatch(productApi.util.updateQueryData("getProductBySlug", slug, (draft) => {
                            const review = draft.reviews.reviewData.data.find(r => r.reviewId === reviewId);
                            if (!review) return;
                            review.replies.pendingReply = undefined;
                            review.replies.list.data.unshift({
                                id: replyId,
                                comment,
                                userId:user.id,
                                userName: user.name,
                                avatarBg: user.avatarBg,
                                createdAt: new Date().getTime(),
                            })
                        }))
                    }
                } catch (error) {
                    patchRequest.undo();
                    throw error
                }
            },
        }),
        loadMoreReplies: builder.mutation<DataApiResponse<PaginatedResult<Reply>>, LoadMoreRepliesParams>({
            query(args) {
                const {  reviewId, params } = args;
                return {
                    url: `/reviews/${reviewId}/replies`,
                    method: "GET",
                    params,
                }
            },
            async onQueryStarted({ slug, reviewId }, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        const { data: newRepliesData, paginationState } = data.responseData;
                        dispatch(productApi.util.updateQueryData("getProductBySlug", slug, (draft) => {
                            const review = draft.reviews.reviewData.data.find(r => r.reviewId === reviewId);
                            if (!review) return;
                            const prevData =
                                review.replies.list.hasFetched
                                    ? review.replies.list.data
                                    : [];
                            review.replies.list = {
                                data: getUniqueReplies({ existingReplies: prevData, newReplies: newRepliesData }),
                                hasFetched: true,
                                paginationState,

                            }
                        }))
                    }
                } catch (error) {
                    throw error
                }
            },
        })
    })
})

function getUniqueReviews({ existingReviews, newReviews }: { existingReviews: ReviewClient[], newReviews: ReviewClient[] }): ReviewClient[] {
    const map = new Map([...existingReviews.map(review => [review.reviewId, review] as const), ...newReviews.map(review => [review.reviewId, review] as const)]);
    return Array.from(map.values());
}

function getUniqueReplies({ existingReplies, newReplies }: { existingReplies: Reply[], newReplies: Reply[] }): Reply[] {
    const map = new Map([...existingReplies.map(reply => [reply.id, reply] as const), ...newReplies.map(reply => [reply.id, reply] as const)]);
    return Array.from(map.values());
}

export const { useGetProductBySlugQuery, useLoadMoreReviewsMutation, useCreateReviewMutation, useLoadMoreRepliesMutation, useCreateReplyMutation } = productApi;