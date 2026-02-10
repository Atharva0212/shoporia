"use client";

import { useGetProductBySlugQuery } from "@/src/app/products/[slug]/features/productDetailsApi";

import { Layout } from "@/src/app/Components/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { markReturnToResults } from "../../ProductListing/utils/navigationState";
import { ProductPurchaseProvider } from "../context/productPurchaseQuantity/ProductPurchaseProvider";
import { VariantFilterProvider } from "../context/variantFilter/VariantFilterProvider";
import { ProductDetailsSkeleton } from "../ui/Skeleton/ProductDetailsSkeleton";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ProductActions } from "./ProductActions/ProductActions";
import { ProductPriceDetails } from "./ProductPriceDetails";
import { ProductRating } from "./ProductRating";
import { ProductTags } from "./ProductTags";
import { QuantitySelector } from "./QuantitySelector";
import { ReviewSection } from "./ReviewSection/ReviewSection";
import { VariantSelector } from "./VariantSelector/VariantSelector";
import { NextJsRouter } from "@/src/Types/types";
import Image from "next/image";

type ProductDetailsContentProps = {
  slug: string;
};

function ErrorState({
  refetch,
  router,
}: {
  refetch: ReturnType<typeof useGetProductBySlugQuery>["refetch"];
  router: NextJsRouter;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <Image
              src={"/icons/circle-x-lg.svg"}
              alt=""
              width={28}
              height={28}
              className="w-7 h-7"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to load product
          </h3>

          <p className="text-sm text-gray-500 mb-6">
            Something went wrong while fetching product. Please try again.
          </p>
          <div className="space-x-4">
            <button
              onClick={refetch}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 active:scale-[0.98] transition"
            >
              <span>Retry</span>
            </button>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 active:scale-[0.98] transition"
            >
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailsContent({ slug }: ProductDetailsContentProps) {
  const { data, isLoading, isError, refetch } = useGetProductBySlugQuery(slug);
  const router = useRouter();
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }
  if (!data) return;
  const {
    id,
    name,
    brand,
    tags,
    variants,
    discount,
    images,
    averageRating,
    reviews,
    reviewCount,
    badges,
    canReviewProduct,
  } = data;

  if (isError) {
    return <ErrorState refetch={refetch} router={router} />;
  }

  function handleBackToProducts() {
    markReturnToResults();
    router.replace(`/products`);
  }

  return (
    <Layout className="max-w-5xl" isMain={true}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12 z-10">
        <ImageGallery productName={name} productImages={images} />
        <div>
          <div className="space-x-1 text-body-sm text-text-500">
            <Link className="hover:underline" href={"/"}>
              Home
            </Link>
            <span>/</span>
            <button className="hover:underline" onClick={handleBackToProducts}>
              Products
            </button>
          </div>
          <div className="mb-2">
            <span className="text-body-sm text-text-700 font-medium">
              {brand}
            </span>
          </div>
          <h1 className="text-h4 font-bold text-gray-900 mb-3">{name}</h1>

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
                slug={slug}
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
