"use client";

import { useRouter } from "next/navigation";
import { featuredProducts } from "./Constants/featuredProducts";
import { FeaturedProductCard } from "./FeaturedProductCard";
import { useCallback } from "react";
import { FeaturedProductCardData } from "./type";

export function FeaturedProductsList() {
  const router = useRouter();
  const navigateToProduct = useCallback(
    function (slug: FeaturedProductCardData["slug"]) {
      router.push(`/products/${slug}`);
    },
    [router],
  );
  return (
    <div className="@container">
      <div className="grid grid-cols-1 @min-sm:grid-cols-2 @min-lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <FeaturedProductCard
            key={product.slug}
            productData={product}
            navigateToProduct={navigateToProduct}
          />
        ))}
      </div>
    </div>
  );
}
