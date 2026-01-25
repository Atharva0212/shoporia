export function ReviewSkeleton() {
  return (
    <div className="py-10 px-4 animate-pulse shadow border border-divider-200 rounded-2xl space-y-6">
      <div className="flex items-start gap-4 ">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-skeleton" />

        {/* User Info & Rating */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="h-6 w-1/4 bg-skeleton rounded" />
            <div className="h-6 w-1/4 bg-skeleton rounded" />
          </div>

          {/* Date */}
          <div className="h-4 bg-skeleton rounded w-20 sm:w-24 md:w-32" />

        </div>
      </div>

      {/* Review Comment */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-skeleton rounded" />
        <div className="h-4 w-5/6 bg-skeleton rounded" />
      </div>
    </div>
  );
}