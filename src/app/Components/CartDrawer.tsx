import Image from "next/image";
import { useCallback } from "react";
import {
  CartItem,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart,
} from "../features/cart/cartSlice";
import { getPersistedCart } from "../products/[slug]/Components/ProductActions/utils/cartStorage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useRouter } from "next/navigation";
import { NextJsRouter } from "@/src/Types/types";

type CartDrawerProps = {
  isCartOpen: boolean;
  handleCartOpenChange: (isCartOpen: boolean) => void;
};

export function CartDrawer({
  isCartOpen,
  handleCartOpenChange,
}: CartDrawerProps) {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router=useRouter();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const increaseQuantity = useCallback(
    function (productId: CartItem["productId"]) {
      const cart = getPersistedCart();
      if(!cart)return;
      dispatch(increaseProductQuantity({ productId }));
    },
    [dispatch],
  );
  const decreaseQuantity = useCallback(
    function (productId: CartItem["productId"]) {
      dispatch(decreaseProductQuantity({ productId }));
    },
    [dispatch],
  );

  const handleRemoveFromCart = useCallback(
    function (productId: CartItem["productId"]) {
      dispatch(removeProductFromCart({ productId }));
    },
    [dispatch],
  );

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => handleCartOpenChange(false)}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-10/12 max-w-md bg-white shadow-2xl z-999 transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <p className="text-sm text-gray-600 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            aria-label="Close Cart Drawer"
            onClick={() => handleCartOpenChange(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <Image
              src={"/icons/close.svg"}
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 text-gray-700"
            />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Image
                  src={"/icons/shopping-bag-lg.svg"}
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 text-gray-400"
                />
              </div>
              <h3 className="text-h5 font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 text-body mb-6">
                Add some products to get started
              </p>
              <button
                onClick={() => handleCartOpenChange(false)}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl text-body font-semibold hover:bg-gray-800 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.productId}
                  router={router}
                  cartItem={item}
                  handleRemoveFromCart={handleRemoveFromCart}
                  decreaseQuantity={decreaseQuantity}
                  increaseQuantity={increaseQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary - Sticky Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 bg-white">
            <div className="p-6 space-y-3">
              {/* Price Breakdown */}
              <div className="space-y-2">

                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between text-gray-900">
                    <span className="text-h5 font-bold">Total</span>
                    <span className="text-h5 font-bold">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div>
              {/* <div className="space-y-2"> */}
                {/* <button className="text-body w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition">
                  Proceed to Checkout
                </button> */}
                <button
                  onClick={() => handleCartOpenChange(false)}
                  className="text-body w-full bg-white text-gray-900 py-3.5 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

type CartItemRowProps={
  router:NextJsRouter;
  cartItem: CartItem;
  handleRemoveFromCart:(productId:CartItem["productId"])=>void,
  decreaseQuantity:(productId:CartItem["productId"])=>void,
  increaseQuantity:(productId:CartItem["productId"])=>void,
}

function CartItemRow({
  router,
  cartItem,
  handleRemoveFromCart,
  decreaseQuantity,
  increaseQuantity,
}: CartItemRowProps) {
  const isMaxQuantity = cartItem.quantity >= cartItem.stock;
  return (
    <div
      key={cartItem.productId}
      className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <div className="bg-white border border-divider-200 rounded-xl ">
            <Image
              src={cartItem.image.src}
              alt={cartItem.image.src}
              width={200}
              height={200}
              className="object-contain rounded-xl "
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 ">
              <h3 className="font-semibold text-gray-900 text-body-sm line-clamp-2 mb-1">
                {cartItem.productName}
              </h3>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {Object.entries(cartItem.variantAttributes).map(
                  ([key, value]) => (
                    <span
                      key={key}
                      className="text-body-xs bg-white text-gray-600 px-2 py-1 rounded-lg border border-gray-200"
                    >
                      {value}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="flex flex-col">
            <button
              onClick={() => handleRemoveFromCart(cartItem.productId)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition shrink-0"
              aria-label="Remove item"
            >
              <Image
                src={"/icons/trash.svg"}
                alt=""
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </button>
            <button
              onClick={()=>router.push(`/products/${cartItem.slug}`)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition shrink-0"
              aria-label="View item"
            >
              <Image
                src={"/icons/eye.svg"}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
          </div>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-2 sm:mb-3">
            <span className="text-body font-bold text-gray-900">
              ₹{cartItem.price.toLocaleString()}
            </span>
          </div>

          {/* Quantity Controls & Stock */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center border-2 border-gray-300 rounded-xl w-fit">
              <button
                aria-label="Reduce count"
                onClick={() => decreaseQuantity(cartItem.productId)}
                className="p-2 hover:bg-gray-100 transition disabled:opacity-50"
                disabled={cartItem.quantity <= 1}
              >
                <Image
                  src={"/icons/minus.svg"}
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
              <span className="text-body-sm px-3 sm:px-4 font-semibold text-gray-900 min-w-10 text-center">
                {cartItem.quantity}
              </span>
              <button
                aria-label="Increase count"
                onClick={() => increaseQuantity(cartItem.productId)}
                className="p-2 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isMaxQuantity}
              >
                <Image
                  src={"/icons/plus.svg"}
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* SKU */}
          <div className="mt-2 text-body-xs text-gray-500">
            SKU: {cartItem.sku}
          </div>
        </div>
      </div>
    </div>
  );
}
