"use client";

import { useGetProductBySlugQuery } from "@/src/app/products/[slug]/features/productsApi";

import { Layout } from "@/src/app/Components/Layout";
import { VariantFilterProvider } from "../context/variantFilter/VariantFilterProvider";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ProductActions } from "./ProductActions/ProductActions";
import { ProductPriceDetails } from "./ProductPriceDetails";
import { ProductRating } from "./ProductRating";
import { ProductTags } from "./ProductTags";
import { QuantitySelector } from "./QuantitySelector";
import { ReviewSection } from "./ReviewSection/ReviewSection";
import { VariantSelector } from "./VariantSelector/VariantSelector";
import { ProductPurchaseProvider } from "../context/productPurchaseQuantity/ProductPurchaseProvider";

type ProductContentProps = {
  slug: string;
};

export function ProductContent({ slug }: ProductContentProps) {
  const { data } = useGetProductBySlugQuery(slug);
  if (!data) return;
  const {
    id,
    name,
    // slug,
    brand,
    // category,
    // subCategory,
    tags,
    variants,
    discount,
    images,
    // rating,
    averageRating,
    reviews,
    reviewCount,
    badges,
    // soldCount,
    // viewCount,
    // wishlistCount,
    // weight,
    // dimensions,
    // metaTitle,
    // metaDescription,
    // metaKeywords,
    // relatedProducts,
    canReviewProduct,
  } = data;

  return (
    <Layout isMain={true}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12 z-10">
        <ImageGallery productName={name} productImages={images} />
        <div>
          <div className="mb-2">
            <span className="text-body-sm text-gray-600 font-medium">
              {brand}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{name}</h1>

          {/* Badges */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="bg-gray-900 text-white text-body-xs font-medium px-3 py-1.5 rounded-lg"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          <ProductRating
            averageRating={averageRating}
            reviewCount={reviewCount}
          />

          <ProductTags tags={tags} />

          <VariantFilterProvider variants={variants}>
            <ProductPriceDetails productDiscount={discount} />
              <VariantSelector />

            <ProductPurchaseProvider>
              <QuantitySelector />

              <ProductActions
                productId={id}
                productName={name}
                productImages={images}
              />
            </ProductPurchaseProvider>
          </VariantFilterProvider>
        </div>
      </div>
      <ReviewSection
        productId={id}
        slug={slug}
        reviews={reviews}
        averageRating={averageRating}
        reviewCount={reviewCount}
        canReviewProduct={canReviewProduct}
      />
    </Layout>
  );
}
