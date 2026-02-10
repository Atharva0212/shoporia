import { ProductDetailsClient } from "../../../types";
import { StarRating } from "../../../../../Components/StarRating/StarRating";
import { Avatar } from "./Avatar";

export default function PendingReviewThread({
  pendingReview,
}: {
  pendingReview: NonNullable<ProductDetailsClient["reviews"]["pendingReview"]>;
}) {
  const { comment, rating, user } = pendingReview;
  return (
    <div
      aria-disabled="true"
      className="rounded-2xl border border-divider-200 hover:shadow-md transition-shadow"
    >
      <p
        aria-disabled="true"
        aria-describedby="pending-review-desc"
        className="sr-only"
      >
        This review is pending approval and is not yet visible to other users.
      </p>
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar initial={user.name[0]} avatarBg={user.avatarBg} />

          {/* User Info & Rating */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-h6 font-semibold text-text-900 opacity-70">
                {user.name}
              </h3>
              <StarRating rating={rating} />
            </div>
          </div>
        </div>

        {/* Review Comment */}
        <p className="text-text-700 mt-3">{comment}</p>
      </div>
    </div>
  );
}
