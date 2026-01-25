import Image from "next/image";
import { useVariantFilter } from "../context/variantFilter/VariantFilterContext";

type ProductPriceDetailsProps = { productDiscount: number };

export function ProductPriceDetails({
  productDiscount,
}: ProductPriceDetailsProps) {
  const { selectedVariant } = useVariantFilter();
  const { price, originalPrice, stock, discount } = selectedVariant;
  const appliedDiscount = discount ?? productDiscount;
  return (
    <div className="my-2">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-h2 font-bold text-gray-900">
          ₹{price.toLocaleString()}
        </span>
        {originalPrice && (
          <>
            <span className="text-h4 text-gray-400 line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
            <span className="bg-green-50 text-green-700 text-body-sm font-semibold px-3 py-1 rounded-full">
              {appliedDiscount}% OFF
            </span>
          </>
        )}
      </div>
      {originalPrice && (
        <p className="text-body-sm text-green-600 font-medium">
          You save ₹{(originalPrice - price).toLocaleString()}
        </p>
      )}
      {/* Stock Status */}
      <div className="mt-4">
        {stock > 0 ? (
          <div className="flex items-center gap-2 text-green-600">
            <Image width={20} height={20} src="/icons/check.svg" alt="" className="w-5 h-5" />
            <span className="font-medium text-body">
              In Stock ({stock} available)
            </span>
          </div>
        ) : (
          <div className="text-red-600 font-semibold">Out of Stock</div>
        )}
      </div>
    </div>
  );
}
