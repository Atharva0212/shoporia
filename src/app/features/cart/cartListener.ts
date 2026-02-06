import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addToCart, decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } from "./cartSlice";
import { RootState } from "../../store/store";
import { persistCart } from "../../products/[slug]/Components/ProductActions/utils/cartStorage";

export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
    matcher: (action) => addToCart.match(action) || increaseProductQuantity.match(action) || decreaseProductQuantity.match(action) || removeProductFromCart.match(action),

    effect: async (_, api) => {
        const state = api.getState() as RootState;
        const items = state.cart.items;
        persistCart({ items });
    }

})