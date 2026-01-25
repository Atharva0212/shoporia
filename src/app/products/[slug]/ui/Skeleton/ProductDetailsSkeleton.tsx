import { ImageGallerySkeleton } from "./ImageGallerySkeleton";
import { ProductInfoPanelSkeleton } from "./ProductInfoPanelSkeleton/ProductInfoPanelSkeleton";
import { ReviewSectionSkeleton } from "./ReviewsSkeleton/ReviewSectionSkeleton";

export function ProductDetailsSkeleton() {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
      <ImageGallerySkeleton />
      <ProductInfoPanelSkeleton />
    </div>
      <ReviewSectionSkeleton/>
    </>
  );
}
