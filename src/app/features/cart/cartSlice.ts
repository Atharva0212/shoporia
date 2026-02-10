import { Attributes } from "@/src/Types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ProductDetails } from "../../products/[slug]/types";

export type CartItem = {
    productId: ProductDetails["id"],
    slug:ProductDetails["slug"],
    productName: ProductDetails["name"],
    image: {
        src: string,
        alt: string,
    },
    variantAttributes: Attributes,
    sku: ProductDetails["variants"][number]["sku"],
    price: ProductDetails["variants"][number]["price"],
    originalPrice: ProductDetails["variants"][number]["originalPrice"],
    quantity: number,
    stock: ProductDetails["variants"][number]["stock"],
}

export type CartState = { items: CartItem[] };

export const initialCartState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState:initialCartState,
    reducers: {
        rehydrateCart:(_state,action:PayloadAction<CartState>)=>{
            return action.payload
        },
        addToCart: (state, action: PayloadAction<{ product: CartItem }>) => {
            state.items.push(action.payload.product);
        },
        increaseProductQuantity: (state, action: PayloadAction<{ productId: CartItem["productId"] }>) => {
            const productId = action.payload.productId;
            state.items = state.items.map(item => item.productId === productId ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } : item);
        },
        decreaseProductQuantity: (state, action: PayloadAction<{ productId: CartItem["productId"] }>) => {
            const productId = action.payload.productId;
            state.items = state.items.map(item => item.productId === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item);
        },
        removeProductFromCart: (state, action: PayloadAction<{ productId: CartItem["productId"] }>) => {
            const productId = action.payload.productId;
            state.items = state.items.filter(item => item.productId !== productId);
        }
    }
})

export const { rehydrateCart,addToCart,increaseProductQuantity,decreaseProductQuantity,removeProductFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;