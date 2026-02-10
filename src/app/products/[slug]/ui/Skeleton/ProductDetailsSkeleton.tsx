import { Layout } from "@/src/app/Components/Layout";
import { ImageGallerySkeleton } from "./ImageGallerySkeleton";
import { ProductInfoPanelSkeleton } from "./ProductInfoPanelSkeleton/ProductInfoPanelSkeleton";
import { ReviewSectionSkeleton } from "./ReviewsSkeleton/ReviewSectionSkeleton";

export function ProductDetailsSkeleton() {
  return (
    <Layout className="max-w-5xl" isMain={true}>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
      <ImageGallerySkeleton />
      <ProductInfoPanelSkeleton />
    </div>
      <ReviewSectionSkeleton/>
    </Layout>
  );
}
