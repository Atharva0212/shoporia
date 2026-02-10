function ToolbarCompactSkeleton() {
  return (
    <div className="space-y-4">
      <div className="sm:hidden flex items-center justify-between gap-4 md:gap-6 *:h-8 *:animate-pulse *:bg-skeleton">
        <div className="flex-1"></div>
        <div className="flex-1"></div>
      </div>

      <div className="sm:hidden flex items-center gap-4 *:h-8 *:animate-pulse *:bg-skeleton">
        <div className="flex-3"></div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

function ToolbarExpandedSkeleton() {
  return (
    <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-4 md:gap-6 *:h-8  *:animate-pulse *:bg-skeleton *:rounded-lg">
      <div className="flex-1"></div>
      <div className="flex-3"></div>
      <div className="flex-1"></div>
      <div className="flex-2"></div>
    </div>
  );
}

export function ToolbarSkeleton() {
  return (
    <div
      role="status"
      aria-busy={true}
      aria-live="polite"
      aria-label="Loading toolbar"
    >
      <span className="sr-only">Loading toolbar</span>
      <div aria-hidden={true}>
        <ToolbarExpandedSkeleton />
        <ToolbarCompactSkeleton />
      </div>
    </div>
  );
}
