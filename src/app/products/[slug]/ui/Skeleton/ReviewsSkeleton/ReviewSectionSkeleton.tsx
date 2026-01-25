import { ReviewSkeleton } from "./ReviewSkeleton";

export function ReviewSectionSkeleton() {
  return (
    <>
      {/* Header */}
      <div className="my-8 space-y-4">
        <div className="h-6 w-1/5 bg-skeleton rounded" />
        <div className="h-4 max-w-1/3 bg-skeleton rounded" />
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <ReviewSkeleton key={index} />
        ))}
      </div>
      <div className="mt-8 text-center h-8 rounded-md w-36 bg-skeleton animate-pulse"></div>
    </>
  );
}
