import { CartState } from "@/src/app/features/cart/cartSlice";
import { getFromStorage, saveToStorage } from "@/src/utils/local";

const STORAGE_KEY = "cart";

export function getPersistedCart(): CartState | null {
  return getFromStorage<CartState>(STORAGE_KEY);
}

export function persistCart(cartState: CartState) {
  saveToStorage<CartState>(cartState, STORAGE_KEY);
}