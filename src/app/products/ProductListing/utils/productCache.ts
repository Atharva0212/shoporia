import { CategoryItem } from "@/src/app/Constants/categories";
import type { CursorPagination, ProductListingState } from "../types";

function buildPrefixKey({ categories, maxPrice }: { categories: CategoryItem["value"][], maxPrice: number }) {
    return `${categories.join(",")}::${maxPrice}::`;
}

export function hasQueryInCache({ categories, maxPrice, query, filterCache }: { categories: CategoryItem["value"][], maxPrice: number, query: string, filterCache: ProductListingState["filterCache"] }): | { hasCache: true, cacheEntry: CursorPagination } | { hasCache: false } {
    const prefix = buildPrefixKey({ categories, maxPrice });

    for (const [cacheKey, cursor] of Object.entries(filterCache)) {
        if (!cacheKey.startsWith(prefix)) continue;
        
        const [, , keyQuery] = cacheKey.split("::");

        if (query.startsWith(keyQuery)) {
            return { hasCache: true, cacheEntry: cursor };
        }
    }
    return { hasCache: false };
}