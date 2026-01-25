import { ProductActionsSkeleton } from "./ProductActionsSkeleton";
import { ProductPillsSkeleton } from "./ProductPillsSkeleton";
import { ProductPriceDetailsSkeleton } from "./ProductPriceDetailsSkeleton";
import { ProductRatingSkeleton } from "./ProductRatingSkeleton";
import { QuantitySelectorSkeleton } from "./QuantitySelectorSkeleton";
import { VariantSelectorSkeleton } from "./VariantSelectorSkeleton";

export function ProductInfoPanelSkeleton() {
  return (
    <section aria-label="Product Panel loading" className="space-y-6">
      <div className="h-8 w-20 rounded-xl bg-skeleton animate-pulse mb-3"></div>
      <div className="h-12 w-1/2 max-w-48 rounded-xl bg-skeleton animate-pulse mb-3"></div>

      <ProductPillsSkeleton ariaLabel="Product Badges Loading" />

      <ProductRatingSkeleton />

      <ProductPillsSkeleton ariaLabel="Product Tags Loading" />

      <ProductPriceDetailsSkeleton />

      <VariantSelectorSkeleton />

      <QuantitySelectorSkeleton />

      <ProductActionsSkeleton />
    </section>
  );
}
