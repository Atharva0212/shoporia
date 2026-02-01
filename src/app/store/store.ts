import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cart/cartSlice";
import { userReducer } from "../features/user/userSlice";
import { productApi } from "../products/[slug]/features/productsApi";

const rootReducer = combineReducers({
    [productApi.reducerPath]:productApi.reducer,
    cart: cartReducer,
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function makeStore(preloadedState: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
            middleware: (getDefaultMiddleware) =>{
      return getDefaultMiddleware().concat(productApi.middleware)
    }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"]