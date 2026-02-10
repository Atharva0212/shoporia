import { useToast } from "@/src/app/Components/Toast/Context/ToastContext";
import {
  addToCart,
  removeProductFromCart,
} from "@/src/app/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/store/hooks";
import { handleCheckout } from "@/src/utils/checkout";
import Image from "next/image";
import { useProductPurchase } from "../../context/productPurchaseQuantity/ProductPurchaseContext";
import { useVariantFilter } from "../../context/variantFilter/VariantFilterContext";
import { ProductDetails } from "../../types";
import { createCartItem } from "./utils/createCartItem";

type ProductActionsProps = {
  productId: ProductDetails["id"];
  slug:ProductDetails["slug"];
  productName: ProductDetails["name"];
  productImages: ProductDetails["images"];
};

export function ProductActions({
  productId,
  slug,
  productName,
  productImages,
}: ProductActionsProps) {
  const { selectedVariant } = useVariantFilter();
  const { quantity } = useProductPurchase();
  const isVariantInCart = useAppSelector((state) =>
    state.cart.items.some((item) => item.productId === productId),
  );
  const dispatch = useAppDispatch();

  const { addToast } = useToast();

  function handleCartButtonClick() {
    if (isVariantInCart) {
      dispatch(removeProductFromCart({ productId }));
    }

    const cartItem = createCartItem({
      product: {
        productId,
        slug,
        productName,
      },
      bestMatchImageVariant:
        productImages.find((image) => image.isPrimary) ?? productImages[0],
      selectedVariant,
    });
    dispatch(addToCart({ product: cartItem }));
  }

  async function handleShare() {
    if (!navigator.share) {
      console.log("Web Share API not supported");
      return;
    }

    try {
      await navigator.share({
        title: productName,
        url: window.location.href,
      });
    } catch (error) {
      console.log("Share cancelled", error);
    }
  }

  return (
    <div className="mt-8 space-y-3">
      <div className="flex gap-3">
        <button
          disabled={selectedVariant.stock === 0}
          onClick={() => handleCartButtonClick()}
          className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <button
          onClick={handleShare}
          className="px-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition"
        >
          <Image
            src={"/icons/share-gray.svg"}
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 text-gray-700"
          />
        </button>
      </div>
      <button
        onClick={() => {
          const pathName = window.location.pathname;
          handleCheckout({
            productId,
            sku: selectedVariant.sku,
            pathName,
            quantity,
            addToast,
          });
        }}
        disabled={!selectedVariant || selectedVariant.stock === 0}
        className="w-full bg-white text-gray-900 py-4 rounded-xl font-semibold border-2 border-gray-900 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Buy Now
      </button>
    </div>
  );
}
