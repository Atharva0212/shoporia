const skeletonClass = "bg-skeleton animate-pulse";

export function FiltersPanelSkeleton() {
  return (
    <aside
      role="status"
      aria-live="polite"
      aria-busy={true}
      aria-label="Loading filter panel"
      className="hidden @3xl:block max-h-min bg-white rounded-2xl p-6 sticky top-24 border border-gray-200"
    >
      <span className="sr-only">Loading filter panel</span>
      <div aria-hidden={true} className="space-y-8">
        <div className={`${skeletonClass} w-5/12 h-6`}></div>

        <div className="space-y-4">
          <div className={`${skeletonClass} w-1/3 h-4`}></div>
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-between gap-3 *:${skeletonClass} *:h-4`}
              >
                <div className="flex-1"></div>
                <div className="flex-5"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className={`${skeletonClass} w-1/3 h-4`}></div>
          <div className={`w-full h-4 ${skeletonClass}`}></div>
        </div>

        <div className="space-y-4">
          <div className={`${skeletonClass} w-1/3 h-4`}></div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-between gap-3 *:${skeletonClass} *:h-4`}
              >
                <div className="flex-1"></div>
                <div className="flex-5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
