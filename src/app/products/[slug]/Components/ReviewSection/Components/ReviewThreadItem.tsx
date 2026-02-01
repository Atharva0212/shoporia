import { useToast } from "@/src/app/Components/Toast/Context/ToastContext";
import { getErrorMessage } from "@/src/utils/getErrorMessage";
import Image from "next/image";
import React, { RefObject, useState } from "react";
import { useLoadMoreRepliesMutation } from "../../../features/productsApi";
import { ProductDetailsClient, Review } from "../../../types";
import { ReplySkeleton } from "../../../ui/Skeleton/ReviewsSkeleton/ReplySkeleton";
import { StarRating } from "../../StarRating/StarRating";
import { useMentionSuggestion } from "../features/mention-suggestion/hook/useMentionSuggestion";
import { Avatar } from "./Avatar";
import { CommentReply } from "./CommentReply";
import { ReplyInput } from "./ReplyInput";

type ReviewProps = {
  review: ProductDetailsClient["reviews"]["reviewData"]["data"][number];
  slug: string;
  inputRef: RefObject<HTMLInputElement | null>;
  openReplyInput: (
    reviewId: Review["reviewId"],
    name: Review["user"]["name"],
  ) => void;
  handleReplyClick: (reviewId: Review["reviewId"]) => void;
  activeReplyReviewId: Review["reviewId"] | null;
  handleReplyReset: () => void;
  handleReplySubmit: (
    e: React.FormEvent<HTMLFormElement>,
    reviewId: ProductDetailsClient["reviews"]["reviewData"]["data"][number]["reviewId"],
  ) => void;
  addToast: ReturnType<typeof useToast>["addToast"];
  handleQueryChange: ReturnType<
    typeof useMentionSuggestion
  >["handleQueryChange"];
  query: string;
  mentionSuggestion: ReturnType<
    typeof useMentionSuggestion
  >["mentionSuggestion"];
  handleKeyDown: ReturnType<typeof useMentionSuggestion>["handleKeyDown"];
  popupRef: ReturnType<typeof useMentionSuggestion>["popupRef"];
};

export function ReviewThreadItem({
  review,
  slug,
  inputRef,
  openReplyInput,
  handleReplyClick,
  activeReplyReviewId,
  handleReplyReset,
  handleReplySubmit,
  addToast,
  handleQueryChange,
  query,
  mentionSuggestion,
  handleKeyDown,
  popupRef,
}: ReviewProps) {
  const [loadMoreReplies, { isLoading: isRepliesLoading }] =
    useLoadMoreRepliesMutation();

  const [isReviewExpanded, setIsReviewExpanded] = useState(false);

  const { reviewId, user, rating, comment, hasReplies, replies, createdAt } =
    review;

  async function fetchReplies(reviewId: Review["reviewId"]) {
    let queryParams = undefined;
    if (replies.list.hasFetched) {
      const { hasMore } = replies.list.paginationState;
      if (!hasMore) {
        addToast("No replies available", "warning");
        return;
      }

      const { createdAt, id } = replies.list.paginationState.cursor;
      queryParams = {
        createdAt,
        id,
      };
    }
    loadMoreReplies({ reviewId, slug, params: queryParams })
      .unwrap()
      .catch((error) => {
        const errorMessage = getErrorMessage(
          error,
          "Failed to load more replies",
        );
        addToast(errorMessage, "error");
      });
  }

  function handleReviewToggle() {
    if (isReviewExpanded) {
      setIsReviewExpanded(false);
      return;
    }
    setIsReviewExpanded(true);
    if (!replies.list.hasFetched) {
      fetchReplies(reviewId);
    }
  }

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

        {(hasReplies||replies.pendingReply||replies.list.data.length>0) && (
          <button
            onClick={handleReviewToggle}
            className="flex items-center gap-2 text-sm font-medium text-text-500 hover:text-text-900 transition"
          >
            <Image
              src={"/icons/chevron-down.svg"}
              alt=""
              width={16}
              height={16}
              className={`w-4 h-4 transition-transform ${
                isReviewExpanded ? "rotate-180" : ""
              }`}
            />
            {isReviewExpanded ? "Hide" : `View Replies`}
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
      {isReviewExpanded && replies.list.data.length !== 0 && (
        <div className="border-t border-divider-200">
          <div className="px-6 py-4 space-y-4">
            {replies.pendingReply && (
              <CommentReply
                replyMode={{ isPending: true, reply: replies.pendingReply }}
              />
            )}
            {replies.list.data.map((reply) => (
              <CommentReply
                key={reply.id}
                replyMode={{
                  isPending: false,
                  reply,
                  openReplyInput,
                  reviewId,
                }}
              />
            ))}
            {isRepliesLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <ReplySkeleton key={index} />
              ))}

            {/* Load More Replies */}
            {!isRepliesLoading &&
              hasReplies &&
              replies.list.hasFetched &&
              replies.list.paginationState.hasMore && (
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
                  Load more replies
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
