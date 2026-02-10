import { Star } from "@/src/app/Components/StarRating/StarRating";
import { useAppDispatch, useAppSelector } from "@/src/app/store/hooks";
import Image from "next/image";
import type { ProductCard, SortOption } from "../types";

function selectVariant({
  variants,
  sortBy,
}: {
  variants: ProductCard["variants"];
  sortBy: SortOption;
}): ProductCard["variants"][number] {
  if (sortBy === "price-high") {
    return variants.reduce((prev, curr) =>
      curr.price > prev.price ? curr : prev,
    );
  }

  if (sortBy === "price-low") {
    return variants.reduce((prev, curr) =>
      curr.price < prev.price ? curr : prev,
    );
  }

  const primary = variants.find((v) => v.isPrimary);
  if (primary) return primary;

  return variants.reduce((prev, curr) =>
    curr.price < prev.price ? curr : prev,
  );
}

export function ProductCardItem({
  product,
  sortBy,
  handleProductClick,
  handleCartButtonClick,
  dispatch,
}: {
  product: ProductCard;
  sortBy: SortOption;
  handleProductClick: (slug: string, scrollY: number) => void;
  handleCartButtonClick: (
    isVariantInCart: boolean,
    dispatch: ReturnType<typeof useAppDispatch>,
    product: ProductCard,
    selectedVariant: ProductCard["variants"][number],
  ) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
}) {
  const selectedVariant = selectVariant({
    variants: product.variants,
    sortBy,
  });
  const { price, originalPrice } = selectedVariant;

  const isVariantInCart = useAppSelector((state) =>
    state.cart.items.some((item) => item.productId === product.productId),
  );

  const discount = Math.round((1 - price / originalPrice) * 100);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
      <div className="flex flex-col">
        <div className="p-2">
          <Image
            width={200}
            height={200}
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover aspect-square rounded-2xl"
          />
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          <div className="flex-1">
            {product.brand && (
              <p className="text-body-sm text-gray-500 mb-1 uppercase tracking-wide">
                {product.brand}
              </p>
            )}

            <h3 className="text-h6 font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
              {product.name}
            </h3>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <Star isFilled={true} />
                <span className="text-body-sm font-medium text-gray-900">
                  {Math.trunc((product.averageRating*10)/10)}
                </span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-body-xs text-gray-600">
                {product.reviews} reviews
              </span>
            </div>

          </div>

          {/* Bottom Section - Price & Actions */}
          <div className="mt-auto">
            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-h5 font-bold text-gray-900">
                  ₹{price.toLocaleString()}
                </span>
                {originalPrice > price && (
                  <span className="text-body text-gray-400 line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-1 bg-green-50 text-green-700 text-body-sm font-semibold rounded">
                    Save ₹{(originalPrice - price).toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({discount}% off)
                  </span>
                </div>
              )}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={() => {
                  const scrollY = window.pageYOffset;
                  handleProductClick(product.slug, scrollY);
                }}
                className="flex-1 px-5 py-3 bg-white border-2 border-gray-900 text-text-900 text-body font-medium rounded-xl flex items-center justify-center gap-2 whitespace-nowrap"
              >
                View Details
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  handleCartButtonClick(
                    isVariantInCart,
                    dispatch,
                    product,
                    selectedVariant,
                  );
                }}
                className="flex-1 px-5 py-3 bg-inverse text-white rounded-xl text-body font-medium flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Image
                  src={"/icons/shopping-cart-white.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                {isVariantInCart ? "Remove from" : "Add to"} Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
