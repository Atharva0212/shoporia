import axios from "axios";
import { useCallback, useState } from "react";
import type { DataApiResponse, PaginatedProductCards, ProductCard, ProductListingQueryParams } from "../types";
import { productListingApi } from "../features/productListingApi";
import { buildProductCacheKey } from "../utils/cacheKeys";
import { CategoryItem } from "@/src/app/Constants/categories";
import { useAppDispatch } from "@/src/app/store/hooks";

export function useFetchProducts({ categories, maxPrice, query }: { categories: CategoryItem["value"][], maxPrice: number, query: string }) {
    const [filterLoadingMap, setFilterLoadingMap] = useState<Record<string, boolean>>({});
    const isFetching = (function () {
        const category = categories.join(",");
        const productCacheKey = buildProductCacheKey({ category, maxPrice, query });
        return !!filterLoadingMap[productCacheKey];
    })();
    const dispatch = useAppDispatch();
    const fetchProducts = useCallback(async function ({ params, baseQueryParams, updateShowLoadMore }: { params: ProductListingQueryParams, baseQueryParams: ProductListingQueryParams, updateShowLoadMore: (isVisible: boolean) => void }) {
        const productCacheKey = buildProductCacheKey({ category: params.category, maxPrice: params.maxPrice, query: params.query });
        setFilterLoadingMap(prev => ({ ...prev, ...{ [productCacheKey]: true } }));
        try {
            const { data } = await axios.get<DataApiResponse<PaginatedProductCards>>("/api/products", { params });
            if (data.success) {
                const { data: productsData, paginationState } = data.responseData;

                dispatch(productListingApi.util.updateQueryData("getProducts", baseQueryParams, (draft) => {

                    draft.products = [...getUniqueProducts({
                        existingProducts: draft.products ?? [],
                        newProducts: productsData,
                    })];
                    const { category, maxPrice, query } = params;
                    const cacheKey = buildProductCacheKey({ category, maxPrice, query });
                    draft.filterCache = {
                        ...draft.filterCache,
                        [cacheKey]: paginationState,
                    };
                }));
                updateShowLoadMore(paginationState.hasMore);
            }
        } catch (error) {
            console.error(error);
        }finally{
            setFilterLoadingMap(prev=>{
              const copy={...prev};
              delete copy[productCacheKey]
              return copy;
            })
        }
    }, [dispatch])
    return { fetchProducts, isFetching }
}

function getUniqueProducts({ existingProducts, newProducts }: { existingProducts: ProductCard[], newProducts: ProductCard[] }): ProductCard[] {
    const map = new Map([...existingProducts.map(product => [product.productId, product] as const), ...newProducts.map(product => [product.productId, product] as const)]);
    return Array.from(map.values());
}