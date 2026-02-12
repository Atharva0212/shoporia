import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductListingQueryParams } from "../types";

type ProductListFiltersState = {
    filters: ProductListingQueryParams;
    initialized: boolean;
};


export const initialFilterState: ProductListFiltersState = {
    initialized: false,
    filters: {}
}

const productListFilters = createSlice({
    name: "productListFilters",
    initialState: initialFilterState,
    reducers: {
        updateProductFilters(
            state,
            action: PayloadAction<ProductListingQueryParams>
        ) {
            state.initialized = true;
            state.filters = action.payload;
        },
    }
})

export const { updateProductFilters } = productListFilters.actions;

export const { reducer: productListFiltersReducer, reducerPath: productListFiltersPath } = productListFilters;