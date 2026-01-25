export function ProductPillsSkeleton({ariaLabel}:{ariaLabel:string}) {
  return (
    <div
      aria-label={ariaLabel}
      aria-busy={true}
      className="flex flex-wrap gap-2"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          aria-hidden="true"
          key={index}
          className="h-8 w-14 bg-skeleton animate-pulse rounded-lg"
        ></span>
      ))}
    </div>
  );
}
