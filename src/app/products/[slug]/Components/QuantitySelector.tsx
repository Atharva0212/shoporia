import { useProductPurchase } from "../context/productPurchaseQuantity/ProductPurchaseContext";
import { useVariantFilter } from "../context/variantFilter/VariantFilterContext";

export function QuantitySelector() {
  const { selectedVariant } = useVariantFilter();
  const { stock } = selectedVariant;
  const {quantity,decrementQuantity,incrementQuantity}=useProductPurchase();
  const clampedQuantity = Math.min(quantity, stock);

  return (
    <>
      {stock > 0 && (
        <div className="mt-6">
          <label className="block text-body font-semibold text-gray-900 mb-3">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-gray-300 rounded-xl">
              <button
                onClick={decrementQuantity}
                className="p-3 hover:bg-gray-50 transition"
              >
                -
              </button>
              <span className="px-6 font-semibold text-gray-900">
                {clampedQuantity}
              </span>
              <button
                onClick={() => incrementQuantity(stock)}
                className="p-3 hover:bg-gray-50 transition"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}