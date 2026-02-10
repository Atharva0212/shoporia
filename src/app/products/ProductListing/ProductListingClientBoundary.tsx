"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ProductListingPageSkeleton } from "./Components/ui/Skeleton/ProductListingPageSkeleton";

const ProductListingContent = dynamic(
  () =>
    import("./ProductListingContent").then((mod) => mod.ProductListingContent),
  { ssr: false },
);

export function ProductListingClientBoundary({
  updatedAtCursor,
}: {
  updatedAtCursor: number;
}) {
  return (
    <Suspense fallback={<ProductListingPageSkeleton />}>
      <ProductListingContent updatedAtCursor={updatedAtCursor} />
    </Suspense>
  );
}
