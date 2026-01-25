import { RefObject, useState } from "react";
import { Star } from "../../StarRating/StarRating";

export function ReviewForm({closeReviewForm,reviewFormRef}:{closeReviewForm:()=>void,reviewFormRef:RefObject<HTMLDivElement|null>}) {
  const [rating, setRating] = useState(0);
  return (
    <div ref={reviewFormRef} className="mb-8 p-6 bg-surface-subtle rounded-xl border border-divider-200">
      <h4 className="text-text-900 text-body font-medium mb-4">
        Write Your Review
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-text-900 text-body-sm font-medium mb-2">
            Rating
          </label>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
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
            placeholder="Share your experience with this product..."
            className="w-full px-4 py-3 border border-divider-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
          />
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-inverse text-white rounded-xl font-medium hover:bg-gray-800 transition">
            Submit Review
          </button>
          <button
            onClick={closeReviewForm}
            className="px-6 py-3 border-2 border-divider-300 text-text-700 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
