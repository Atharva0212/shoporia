import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductListingCardsSkeleton({ length }: { length: number }) {
  return (
    <section
      aria-live="polite"
      role="status"
      aria-label="Loading products"
      aria-busy={true}
    >
      <span className="sr-only">Loading products</span>
      <div aria-hidden={true} className="grid @sm:grid-cols-2 gap-4 @2xl:grid-cols-3">
        {Array.from({ length }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
