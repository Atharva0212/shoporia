import { StarRating } from "./StarRating/StarRating";

type ProductRatingProps = {
  averageRating: number;
  reviewCount: number;
};

export function ProductRating({ averageRating, reviewCount }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <StarRating rating={averageRating} />
        </div>
        <span className="text-body-sm font-semibold text-gray-900">
          {Math.trunc(averageRating * 10) / 10}
        </span>
      </div>
      <span className="text-body-sm text-gray-500">({reviewCount})</span>
    </div>
  );
}