export function ProductRatingSkeleton() {
  return (
    <div aria-label="Product Rating Loading" aria-busy={true} className="w-1/2 h-8 rounded-xl bg-skeleton animate-pulse">
    </div>
  );
}