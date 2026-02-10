import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { DataApiResponse, PaginatedProductCards, ProductListingQueryParams, ProductListingState } from "../types";
import { buildProductCacheKey } from "../utils/cacheKeys";

export const productListingApi = createApi({
    reducerPath: "product:listing",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<ProductListingState, ProductListingQueryParams, DataApiResponse<PaginatedProductCards>>({
            query: (params) => {
                
                return {
                    url: "/products",
                    params,
                }
            },

            transformResponse(baseQueryReturnValue, _, args) {
                if (!baseQueryReturnValue.success) {
                    throw new Error(baseQueryReturnValue.error);
                };
                const { data, paginationState } = baseQueryReturnValue.responseData;
                const { category, maxPrice, query } = args;
                const cacheKey = buildProductCacheKey({ category, maxPrice, query });
                return {
                    products: data,
                    filterCache: { [cacheKey]: paginationState },
                }
            },
        }),
    })
})

export const { useGetProductsQuery } = productListingApi;
