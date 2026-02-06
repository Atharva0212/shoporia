import { RefObject, useRef, useState } from "react";
import { Star } from "../../StarRating/StarRating";
import { useCreateReviewMutation } from "../../../features/productsApi";
import { UserState } from "@/src/app/features/user/userSlice";
import { useModal } from "@/src/app/Components/Modal/Context/ModalContext";
import { ProductDetailsClient } from "../../../types";
import { getErrorMessage } from "@/src/utils/getErrorMessage";
import { useCompleteProfileModal } from "@/src/hooks/useCompleteProfileModal";

type ReviewFormProps = {
  createReview:ReturnType<typeof useCreateReviewMutation>["0"]
  closeReviewForm: () => void;
  reviewFormRef: RefObject<HTMLDivElement | null>;
  userState: UserState;
  openCompleteProfileModal:ReturnType<typeof useCompleteProfileModal>["openCompleteProfileModal"]
  setModal: ReturnType<typeof useModal>["setModal"];
  productId: ProductDetailsClient["id"];
  slug: string;
};

export function ReviewForm({
  createReview,
  closeReviewForm,
  reviewFormRef,
  userState,
  openCompleteProfileModal,
  setModal,
  productId,
  slug,
}: ReviewFormProps) {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState(0);

  function handleReviewSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { isLoggedIn, userId, name, avatarBg } = userState;
    if (!isLoggedIn) {
      setModal("Please login before you give review", "error");
      return;
    }
    if(!userId || !name || !avatarBg){
      openCompleteProfileModal()
      return;
    }
    
    const commentInput = commentRef.current?.value;
    if (!commentInput || commentInput.length < 2) {
      setModal("Comment must be atleast 2 characters", "error");
      return;
    }
    if (rating < 1 || rating > 5) {
      setModal("Please give rating within the range of 1-5", "error");
      return;
    }
    createReview({
      productId,
      slug,
      comment: commentInput,
      rating,
      user: {
        id: userId,
        name,
        avatarBg,
      },
    })
      .unwrap()
      .then(() => {
        if (commentRef.current) {
          commentRef.current.value = "";
        }
        setRating(0);
        closeReviewForm();
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(
          error,
          "Failded to submit review. Please try again.",
        );
        setModal(errorMessage, "error");
      });
  }

  return (
    <div
      ref={reviewFormRef}
      className="mb-8 p-6 bg-surface-subtle rounded-xl border border-divider-200"
    >
      <h4 className="text-text-900 text-body font-medium mb-4">
        Write Your Review
      </h4>
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <div>
          <label className="block text-text-900 text-body-sm font-medium mb-2">
            Rating
          </label>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Rate ${index + 1} star${index + 1 > 1 ? "s" : ""}`}
                aria-pressed={rating > index}
                onClick={() => {
                  setRating(index + 1);
                }}
                className="p-1 hover:scale-110 transition"
              >
                <Star isFilled={rating > index} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-body-sm font-medium text-gray-900 mb-2">
            Your Review
          </label>
          <textarea
            rows={4}
            ref={commentRef}
            placeholder="Share your experience with this product..."
            className="w-full px-4 py-3 border border-divider-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-inverse text-white rounded-xl font-medium hover:bg-gray-800 transition"
          >
            Submit Review
          </button>
          <button
            aria-label="Close review form"
            type="reset"
            onClick={closeReviewForm}
            className="px-6 py-3 border-2 border-divider-300 text-text-700 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
