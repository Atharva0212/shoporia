import { useAppDispatch, useAppSelector } from "@/src/app/store/hooks";
import { useVariantFilter } from "../../context/variantFilter/VariantFilterContext";
import { ProductDetails } from "../../types";
import { getPersistedCart, persistCart } from "./utils/cartStorage";
import { createCartItem } from "./utils/createCartItem";
import { addToCart, removeProductFromCart } from "@/src/app/features/cart/cartSlice";
import Image from "next/image";

type ProductActionsProps = {
  productId: ProductDetails["id"];
  productName: ProductDetails["name"];
  productImages: ProductDetails["images"];
};

export function ProductActions({
  productId,
  productName,
  productImages,
}: ProductActionsProps) {
  const { selectedVariant } = useVariantFilter();
  const isVariantInCart = useAppSelector((state) =>
    state.cart.items.some((item) => item.productId === productId)
  );
  const dispatch = useAppDispatch();

  function handleCartButtonClick() {
    if (isVariantInCart) {
      dispatch(removeProductFromCart({ productId }));
      const cart = getPersistedCart();
      if (!cart) return;
      const newCart = cart.items.filter((item) => item.productId !== productId);
      persistCart({ items: newCart });
      return;
    }
    const product = createCartItem({
      product: {
        productId,
        productName,
      },
      bestMatchImageVariant:productImages.find(image=>image.isPrimary)??productImages[0],
      selectedVariant,
    });
    dispatch(addToCart({ product }));
    const cart = getPersistedCart();
    const newCart = cart ? cart : { items: [] };
    newCart.items.push(product);
    persistCart(newCart);
  }

  async function handleShare() {
  if (!navigator.share) {
    console.log("Web Share API not supported");
    return;
  }

  try {
    await navigator.share({
      title: "Product Details",
      text: "Check out this product!",
      url: window.location.href,
    });
  } catch (error) {
    // User cancelled or share failed — ignore silently
    console.log("Share cancelled");
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
          <Image src={"/icons/shopping-cart-white.svg"} alt="" width={20} height={20} className="w-5 h-5" />
          {isVariantInCart ? "Remove from" : "Add to"} Cart
        </button>
        <button onClick={handleShare} className="px-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition">
          <Image src={"/icons/share-gray.svg"} alt="" width={20} height={20} className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      <button
        disabled={!selectedVariant || selectedVariant.stock === 0}
        className="w-full bg-white text-gray-900 py-4 rounded-xl font-semibold border-2 border-gray-900 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Buy Now
      </button>
    </div>
  );
}
