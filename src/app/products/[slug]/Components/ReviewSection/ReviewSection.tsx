import { useModal } from "@/src/app/Components/Modal/Context/ModalContext";
import { useToast } from "@/src/app/Components/Toast/Context/ToastContext";
import { useAppSelector } from "@/src/app/store/hooks";
import { getErrorMessage } from "@/src/utils/getErrorMessage";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  useCreateReplyMutation,
  useCreateReviewMutation,
  useLoadMoreReviewsMutation,
} from "../../features/productsApi";
import {
  ProductDetails,
  ProductDetailsClient,
  Reply,
  Review,
} from "../../types";
import { ReviewSkeleton } from "../../ui/Skeleton/ReviewsSkeleton/ReviewSkeleton";
import { StarRating } from "../StarRating/StarRating";
import PendingReviewThread from "./Components/PendingReviewThread";
import { ReviewForm } from "./Components/ReviewForm";
import { ReviewThreadItem } from "./Components/ReviewThreadItem";
import { useMentionSuggestion } from "./features/mention-suggestion/hook/useMentionSuggestion";
import type { MentionItem } from "./features/mention-suggestion/types";
import { useCompleteProfileModal } from "@/src/hooks/useCompleteProfileModal";

type ReviewSectionProps = {
  productId: ProductDetailsClient["id"];
  slug: string;
  reviews: ProductDetailsClient["reviews"];
  averageRating: ProductDetails["averageRating"];
  reviewCount: ProductDetails["reviewCount"];
  canReviewProduct: boolean;
};

export function ReviewSection({
  productId,
  slug,
  reviews,
  averageRating,
  reviewCount,
  canReviewProduct,
}: ReviewSectionProps) {

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeReplyReviewId, setActiveReplyReviewId] = useState<
    Review["reviewId"] | null
  >(null);

  const [loadMoreReviews, { isLoading: isReviewLoading }] =
    useLoadMoreReviewsMutation();

  const [createReview, { isLoading: isCreatingReview }] =
    useCreateReviewMutation();

  const [createReply] = useCreateReplyMutation();

  const {openCompleteProfileModal}=useCompleteProfileModal()

  const [query, setQuery] = useState("");

  const { setModal } = useModal();
  const { addToast } = useToast();

  const userState = useAppSelector((state) => state.user);

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

  const resetReplyQuery = useCallback(() => {
    setQuery("");
  }, []);

  const clearActiveReplyReview = useCallback(() => {
    setActiveReplyReviewId(null);
  }, []);

  function handleReplyClick(reviewId: Review["reviewId"]) {
    setActiveReplyReviewId(reviewId);
    setQuery("");
    setMentionUsersFromReview(reviewId);
  }

  function getMentionableUsersForReview(
    reviewId: ProductDetailsClient["reviews"]["reviewData"]["data"][number]["reviewId"],
  ): MentionItem[] {
    const targetReview = reviews.reviewData.data.find(
      (review) => review.reviewId === reviewId,
    );
    if (!targetReview) return [];

    const mentionableUsers: MentionItem[] = [
      {
        id: targetReview.user.id,
        name: `@${targetReview.user.name}`,
      },
      ...targetReview.replies.list.data.map((reply) =>
        createMentionItem(reply.userId, reply.userName),
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

  async function fetchReview() {
    const { hasMore } = reviews.reviewData.paginationState;
    if (!hasMore) {
      addToast("No more reviews available.", "warning");
      return;
    }

    const { createdAt, id } = reviews.reviewData.paginationState.cursor;
    const params = {
      createdAt,
      id,
    };

    loadMoreReviews({ productId, slug, params }).unwrap().catch(error=>{
      const errorMessage=getErrorMessage(error,"Failed to load more reviews");
      addToast(errorMessage,"error");
    });
  }

  function openReplyInput(
    reviewId: Review["reviewId"],
    userName: Reply["userName"],
  ) {
    if (activeReplyReviewId !== reviewId) {
      return;
    }
    const { isLoggedIn, userId, name, avatarBg } = userState;
    if (!isLoggedIn) {
      setModal("You need to be logged in to post a reply.", "error");
      return;
    }

    if (!name || !userId || !avatarBg) {
      openCompleteProfileModal();
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

  const handleReplyReset = useCallback(() => {
    setActiveReplyReviewId(null);
    setQuery("");
    closeMentionList();
    updateMentionItems([]);
  }, [closeMentionList, updateMentionItems]);

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
      reviewFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [showReviewForm]);

  function openReviewForm() {
    const { isLoggedIn, userId, name, avatarBg } = userState;
    if (!isLoggedIn) {
      setModal("Please login before you give review", "error");
      return;
    }
    if (!userId || !name || !avatarBg) {
      openCompleteProfileModal();
      return;
    }

    setShowReviewForm(true);
  }

  const handleReplySubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      reviewId: ProductDetailsClient["reviews"]["reviewData"]["data"][number]["reviewId"],
    ) => {
      e.preventDefault();
      if (!activeReplyReviewId || !query) return;

      const { isLoggedIn, userId, name, avatarBg } = userState;
      if (!isLoggedIn) {
        setModal("You need to be logged in to post a reply.", "error");
        return;
      }
      if (!query) {
        addToast("Reply cannot be empty", "warning");
        return;
      }
      if (!name || !userId || !avatarBg) {
        openCompleteProfileModal();
        return;
      }
      createReply({
        slug,
        reviewId,
        comment: query,
        user: {
          id: userId,
          name,
          avatarBg,
        },
      })
        .unwrap()
        .then(() => {
          resetReplyQuery();
          clearActiveReplyReview();
        });
    },
    [
      activeReplyReviewId,
      createReply,
      slug,
      userState,
      openCompleteProfileModal,
      setModal,
      addToast,
      query,
      resetReplyQuery,
      clearActiveReplyReview,
    ],
  );

  return (
    <section className="bg-white rounded-2xl p-6 border border-divider-200">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h2 className="text-h5 font-bold text-text-900">Customer Reviews</h2>
          <div className="text-text-700 text-body-sm flex items-center gap-2">
            <StarRating rating={averageRating} />
            <span className="font-bold">
              {Math.trunc(averageRating * 10) / 10}
            </span>{" "}
            <span>Based on {reviewCount} reviews</span>
          </div>
        </div>
        {canReviewProduct && !isCreatingReview && (
          <button
            onClick={openReviewForm}
            className="bg-inverse text-white px-6 py-3 rounded-2xl"
          >
            Write a review
          </button>
        )}
      </div>

      {canReviewProduct && showReviewForm && (
        <ReviewForm
          createReview={createReview}
          reviewFormRef={reviewFormRef}
          closeReviewForm={closeReviewForm}
          userState={userState}
          openCompleteProfileModal={openCompleteProfileModal}
          setModal={setModal}
          productId={productId}
          slug={slug}
        />
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews && "pendingReview" in reviews && reviews.pendingReview && (
          <PendingReviewThread pendingReview={reviews.pendingReview} />
        )}
        {reviews.reviewData.data.map((review) => (
          <ReviewThreadItem
            key={review.reviewId}
            review={review}
            slug={slug}
            inputRef={inputRef}
            openReplyInput={openReplyInput}
            handleReplyClick={handleReplyClick}
            activeReplyReviewId={activeReplyReviewId}
            handleReplyReset={handleReplyReset}
            handleReplySubmit={handleReplySubmit}
            addToast={addToast}
            handleQueryChange={handleQueryChange}
            query={query}
            mentionSuggestion={mentionSuggestion}
            handleKeyDown={handleKeyDown}
            popupRef={popupRef}
          />
        ))}
      </div>
      {isReviewLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <ReviewSkeleton key={index} />
        ))}
      {/* Load More Reviews */}
      {!isReviewLoading && reviews.reviewData.paginationState.hasMore && (
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
