import { useAppSelector } from "@/src/app/store/hooks";
import axios from "axios";
import { useLayoutEffect, useRef, useState } from "react";
import { PaginatedReview, ProductDetails, Reply, Review } from "../../types";
import { Avatar } from "./Components/Avatar";
import { CommentReply } from "./Components/CommentReply";
import { ReplyInput } from "./Components/ReplyInput";
import { useMentionSuggestion } from "./features/mention-suggestion/hook/useMentionSuggestion";
import type { MentionItem } from "./features/mention-suggestion/types";
import { ReplySkeleton } from "../../ui/Skeleton/ReviewsSkeleton/ReplySkeleton";
import { ReviewSkeleton } from "../../ui/Skeleton/ReviewsSkeleton/ReviewSkeleton";
import Image from "next/image";
import { StarRating } from "../StarRating/StarRating";
import { ReviewForm } from "./Components/ReviewForm";

type ReviewSectionProps = {
  reviewData: PaginatedReview;
  averageRating: ProductDetails["averageRating"];
  reviewCount: ProductDetails["reviewCount"];
  canReviewProduct: boolean;
};

export function ReviewSection({
  reviewData,
  averageRating,
  reviewCount,
  canReviewProduct,
}: ReviewSectionProps) {
  const [paginatedReviews, setPaginatedReviews] =
    useState<PaginatedReview>(reviewData);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeReplyReviewId, setActiveReplyReviewId] = useState<
    Review["reviewId"] | null
  >(null);
  const [query, setQuery] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Review["reviewId"][]>(
    [],
  );
  const [reviewRepliesLoading, setReviewRepliesLoading] = useState<
    Record<Review["reviewId"], boolean>
  >({});

  const userName = useAppSelector((state) => state.user.name);

  function setQueryValue(value: string) {
    setQuery(value);
  }

  const inputRef = useRef<HTMLInputElement | null>(null);

  const reviewFormRef = useRef<HTMLDivElement | null>(null);

  const {
    mentionSuggestion,
    popupRef,
    handleQueryChange,
    handleKeyDown,
    closeMentionList,
    updateMentionItems,
  } = useMentionSuggestion({ query, setQueryValue, inputRef });

  function handleReplyClick(reviewId: Review["reviewId"]) {
    setActiveReplyReviewId(reviewId);
    setQuery("");
    setMentionUsersFromReview(reviewId);
  }

  function getMentionableUsersForReview(
    reviewId: Review["reviewId"],
  ): MentionItem[] {
    const targetReview = paginatedReviews.data.find(
      (review) => review.reviewId === reviewId,
    );
    if (!targetReview) return [];

    const mentionableUsers: MentionItem[] = [
      {
        id: targetReview.user.id,
        name: `@${targetReview.user.name}`,
      },
      ...targetReview.replies.data.map((reply) =>
        createMentionItem(reply.id, reply.userName),
      ),
    ];
    return mentionableUsers;
  }

  function createMentionItem(
    id: Reply["id"],
    name: Reply["userName"],
  ): MentionItem {
    return { id, name: `@${name}` };
  }

  function setMentionUsersFromReview(reviewId: Review["reviewId"]) {
    const mentionableUsers = getMentionableUsersForReview(reviewId);
    updateMentionItems(mentionableUsers);
  }

  function handleReplySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!activeReplyReviewId || !query) return;

    if (!userName) {
      alert("Please enter your name before adding an comment");
      return;
    }
    const newReply: Reply = {
      id: crypto.randomUUID(),
      userName,
      avatarBg: "#23ab45",
      comment: query,
      createdAt: new Date(),
    };

    setPaginatedReviews((prev) => ({
      ...prev,
      data: prev.data.map((review) =>
        review.reviewId === activeReplyReviewId
          ? {
              ...review,
              replies: {
                ...review.replies,
                data: [...review.replies.data, newReply],
              },
            }
          : review,
      ),
    }));
    setActiveReplyReviewId(null);
    setQuery("");
  }

  async function fetchReplies(reviewId: Review["reviewId"]) {
    const targetReview = paginatedReviews.data.find(
      (review) => review.reviewId === reviewId,
    );
    if (!targetReview) return; //show toast;
    let queryParams = {};
    const { hasFetched } = targetReview.replies;
    if (hasFetched) {
      const { hasMore } = targetReview.replies.paginationState;
      if (!hasMore) return; //show toast

      const { createdAt, lastId } = targetReview.replies.paginationState.cursor;
      queryParams = {
        createdAt,
        ...(lastId ? { lastId } : {}),
      };
    }
    setReviewRepliesLoading((prev) => ({ ...prev, ...{ reviewId: true } }));
    try {
      const respose = await axios.get("", {
        params: queryParams,
      });
      const { data: _ } = respose;
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setReviewRepliesLoading((prev) => ({ ...prev, ...{ reviewId: false } }));
    }
    const newReplies: Reply[] = [
      {
        id: crypto.randomUUID(),
        userName: "Nina",
        avatarBg: "#e9ecef",
        comment: "@George Could you provide screenshots?",
        createdAt: new Date("2025-12-02T12:10:00Z"),
      },
      {
        id: crypto.randomUUID(),
        userName: "Oscar",
        avatarBg: "#e9ecef",
        comment: "This seems like a minor bug, should be fixed soon.",
        createdAt: new Date("2025-12-02T12:30:00Z"),
      },
    ];
    setPaginatedReviews((prev) => ({
      ...prev,
      data: prev.data.map((review) => {
        if (review.reviewId === reviewId) {
          const { data } = review.replies;
          const mergedReplies = [
            ...new Map([...data, ...newReplies].map((r) => [r.id, r])).values(),
          ];
          return {
            ...review,
            replies: {
              paginationState: {
                hasMore: false,
              },
              hasFetched: true,
              cursor: {
                createdAt: new Date(),
                lastId: crypto.randomUUID(),
              },
              hasMore: false,
              data: mergedReplies,
            },
          };
        }
        return review;
      }),
    }));
  }

  async function fetchReview() {
    const { hasMore } = paginatedReviews.paginationState;
    if (!hasMore) return; //show toast
    setReviewLoading(true);
    setTimeout(() => {
      setReviewLoading(false);
    }, 2000);
    //     const queryParams={
    // ...paginatedReviews.paginationState.cursor
    //     }
    //     try{
    //       const response=await axios.get("",{params:queryParams});
    //     }catch(error:unknown){
    // console.error(error);
    //     }
    const newReview: Review[] = [
      {
        reviewId: "r3",
        user: { id: "u4", name: "David", avatarBg: "#23ab45" },
        rating: 4,
        comment: "Good quality, but shipping was delayed.",
        createdAt: new Date("2025-12-02T09:15:00Z"),
        repliesCount: 3,
        replies: {
          hasFetched: false,
          // cursor and hasMore can be added when replies are fetched
          data: [
            // {
            //   id: "r2-reply1",
            //   user: { id: "u5", name: "Eve" },
            //   comment: "@David Thanks for the feedback!",
            //   createdAt: new Date("2025-12-02T09:45:00Z"),
            // },
            // {
            //   id: "r2-reply2",
            //   user: { id: "u6", name: "Frank" },
            //   comment: "I had a similar experience with shipping.",
            //   createdAt: new Date("2025-12-02T10:10:00Z"),
            // },
            // {
            //   id: "r2-reply3",
            //   user: { id: "u7", name: "Grace" },
            //   comment: "@Eve Any suggestions for faster delivery?",
            //   createdAt: new Date("2025-12-02T10:35:00Z"),
            // },
          ],
        },
      },
    ];
    setPaginatedReviews((prev) => ({
      ...prev,
      paginationState: {
        hasMore: false,
      },
      data: [
        ...new Map(
          [...prev.data, ...newReview].map((r) => [r.reviewId, r]),
        ).values(),
      ],
    }));
  }

  function openReplyInput(
    reviewId: Review["reviewId"],
    userName: Reply["userName"],
  ) {
    if (activeReplyReviewId !== reviewId) {
      return;
    }
    setActiveReplyReviewId(reviewId);
    setQuery((prev) => {
      return prev + ` @${userName} `;
    });
    inputRef.current?.focus();
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setMentionUsersFromReview(reviewId);
  }

  function areRepliesExpanded(id: Review["reviewId"]) {
    if (expandedReviews.includes(id)) return true;
    return false;
  }

  function areRepliesLoading(id: Review["reviewId"]) {
    if (reviewRepliesLoading[id]) {
      return true;
    }
    return false;
  }

  function handleReplyReset() {
    setActiveReplyReviewId(null);
    setQuery("");
    closeMentionList();
    updateMentionItems([]);
  }

  function closeReviewForm() {
    setShowReviewForm(false);
  }

  useLayoutEffect(() => {
    if (inputRef.current && activeReplyReviewId) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeReplyReviewId]);

  useLayoutEffect(() => {
    if (reviewFormRef.current && showReviewForm) {
      reviewFormRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [showReviewForm]);

  return (
    <section className="bg-white rounded-2xl p-6 border border-divider-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h2 className="text-h5 font-bold text-text-900">Customer Reviews</h2>
          <div className="text-text-700 text-body-sm flex items-center gap-2">
            <StarRating rating={averageRating} />
            <span className="font-bold">{averageRating}</span>{" "}
            <span>Based on {reviewCount} reviews</span>
          </div>
        </div>
        {!canReviewProduct && (
          <button onClick={()=>setShowReviewForm(true)} className="bg-inverse text-white px-6 py-3 rounded-2xl">
            Write a review
          </button>
        )}
      </div>

      {!canReviewProduct && showReviewForm && (
        <ReviewForm reviewFormRef={reviewFormRef} closeReviewForm={closeReviewForm} />
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {paginatedReviews.data.map((review) => {
          const {
            reviewId,
            user,
            rating,
            comment,
            repliesCount,
            replies,
            createdAt,
          } = review;
          const isExpanded = areRepliesExpanded(reviewId);
          const isRepliesLoading = areRepliesLoading(reviewId);

          return (
            <div
              key={reviewId}
              className="rounded-2xl border border-divider-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6 pb-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar initial={user.name[0]} avatarBg={user.avatarBg} />

                  {/* User Info & Rating */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        onClick={() => openReplyInput(reviewId, user.name)}
                        className="text-h6 font-semibold text-text-900"
                      >
                        {user.name}
                      </h3>
                      <StarRating rating={rating} />
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1 text-body-sm text-text-500 mb-3">
                      <Image
                        src={"/icons/calendar.svg"}
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      {new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-text-700 mt-3">{comment}</p>
              </div>

              {/* Review Actions */}
              <div className="px-6 pb-4 flex items-center gap-4">
                <button
                  onClick={() => handleReplyClick(reviewId)}
                  className="flex items-center gap-2 text-body-sm font-medium text-gray-600 hover:text-gray-900 transition"
                >
                  <Image
                    src={"/icons/message-circle.svg"}
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  Reply
                </button>

                {repliesCount > 0 && (
                  <button
                    onClick={() => {
                      setExpandedReviews((prev) => {
                        if (prev.includes(reviewId)) {
                          return prev.filter((p) => p !== reviewId);
                        }
                        return [reviewId, ...prev];
                      });
                      const targetReview = paginatedReviews.data.find(
                        (review) => review.reviewId === reviewId,
                      );
                      if (!targetReview) return;
                      if (!targetReview.replies.hasFetched) {
                        fetchReplies(reviewId);
                      }
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-text-500 hover:text-text-900 transition"
                  >
                    <Image
                      src={"/icons/chevron-down.svg"}
                      alt=""
                      width={16}
                      height={16}
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                    {isExpanded ? "Hide" : `View ${repliesCount}`}{" "}
                    {repliesCount === 1 ? "Reply" : "Replies"}
                  </button>
                )}
              </div>

              {/* Reply Input */}
              {activeReplyReviewId === reviewId && (
                <ReplyInput
                  handleReplyReset={handleReplyReset}
                  handleReplySubmit={handleReplySubmit}
                  inputRef={inputRef}
                  handleQueryChange={handleQueryChange}
                  query={query}
                  reviewId={reviewId}
                  mentionSuggestion={mentionSuggestion}
                  handleKeyDown={handleKeyDown}
                  popupRef={popupRef}
                />
              )}

              {/* Replies List */}
              {isExpanded && replies.data.length !== 0 && (
                <div className="border-t border-divider-200">
                  <div className="px-6 py-4 space-y-4">
                    {replies.data.map((reply) => (
                      <>
                        <CommentReply
                          key={reply.id}
                          reply={reply}
                          openReplyInput={openReplyInput}
                          reviewId={review.reviewId}
                        />
                        {isRepliesLoading &&
                          Array.from({ length: 3 }).map((_, index) => (
                            <ReplySkeleton key={index} />
                          ))}
                      </>
                    ))}

                    {/* Load More Replies */}
                    {replies.hasFetched && replies.paginationState.hasMore && (
                      <button
                        onClick={() => fetchReplies(reviewId)}
                        className="text-body-sm font-medium text-text-500 hover:text-text-900 transition flex items-center gap-2"
                      >
                        <Image
                          src={"/icons/chevron-down.svg"}
                          alt=""
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        Load {repliesCount - replies.data.length} more{" "}
                        {repliesCount - replies.data.length === 1
                          ? "reply"
                          : "replies"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {reviewLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <ReviewSkeleton key={index} />
        ))}
      {/* Load More Reviews */}
      {paginatedReviews.paginationState.hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={fetchReview}
            className="px-8 py-3 bg-white border-2 border-divider-300 text-text-900 font-semibold rounded-xl hover:bg-gray-50 hover:border-divider-400 transition inline-flex items-center gap-2"
          >
            <Image
              src={"/icons/chevron-down.svg"}
              alt=""
              width={16}
              height={16}
              className="w-5 h-5"
            />
            Load More Reviews
          </button>
        </div>
      )}
    </section>
  );
}
