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
        getProducts: builder.query<ProductListingState, ProductListingQueryParams,DataApiResponse<PaginatedProductCards>>({
            query: (params) => {
                return {
                    url: "/products",
                    params,
                }
            },
            // merge(currentCacheData, responseData) {
            //     const { products: existingProducts, filterCache: currentFilterCache } = currentCacheData ?? {
            //         existingProducts: [],
            //         currentFilterCache: {}
            //     };
            //     const { products, filterCache: incomingFilterCache } = responseData;
            //     const mergedProducts = [...getUniqueProducts({
            //         existingProducts,
            //         newProducts: products,
            //     })];
            //     const updatedFilterCache = {
            //         ...currentFilterCache,
            //         ...incomingFilterCache,
            //     };
            //     return {
            //         products: mergedProducts,
            //         filterCache: updatedFilterCache,
            //     }
            // },

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
//             async onQueryStarted(args, { dispatch, queryFulfilled,getState }) {
//   try {
//     const { data } = await queryFulfilled;
//     const state=getState() as RootState;
//     const {filters}=state.productListFilters;
    
//     const {products,filterCache:incomingFilterCache}=data;
//                     dispatch(productListingApi.util.updateQueryData("getProducts", filters, (draft) => {
    
//                         draft.products = [...getUniqueProducts({
//                             existingProducts: draft.products ?? [],
//                             newProducts: products,
//                         })];
//                         draft.filterCache = {
//                             ...draft.filterCache,
//                             ...incomingFilterCache,
//                         };
//                     }));
//   } catch {}
// }

        }),
    })
})

export const { useGetProductsQuery } = productListingApi;