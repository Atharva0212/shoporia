export function ProductActionsSkeleton() {
  return (
    <div aria-label="Product Actions Loading" aria-busy={true} className="space-y-3 animate-pulse w-full">
      <div aria-hidden="true" className="flex gap-3 w-full">
        <div aria-hidden="true" className="flex-1 h-12 bg-skeleton rounded-xl" />
        <div aria-hidden="true" className="w-12 h-12 bg-skeleton rounded-xl" />
      </div>
      <div aria-hidden="true" className="h-12 w-full bg-skeleton rounded-xl" />
    </div>
  );
}
