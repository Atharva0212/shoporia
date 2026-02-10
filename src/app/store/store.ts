import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cart/cartSlice";
import { userReducer } from "../features/user/userSlice";
import { productDetailsApi } from "../products/[slug]/features/productDetailsApi";
import { cartListenerMiddleware } from "../features/cart/cartListener";
import { productListingApi } from "../products/ProductListing/features/productListingApi";
import { productListFiltersReducer } from "../products/ProductListing/features/productListFilters.slice";

const rootReducer = combineReducers({
    [productDetailsApi.reducerPath]:productDetailsApi.reducer,
    [productListingApi.reducerPath]:productListingApi.reducer,
    productListFilters:productListFiltersReducer,
    cart: cartReducer,
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function makeStore(preloadedState: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
            middleware: (getDefaultMiddleware) =>{
      return getDefaultMiddleware().concat(productDetailsApi.middleware,cartListenerMiddleware.middleware,productListingApi.middleware)
    }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"]