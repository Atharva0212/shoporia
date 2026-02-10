import { CategoryItem } from "@/src/app/Constants/categories";
import type { SortOption } from "../types";
import { getSessionItem, removeSessionItem, setSessionItem } from "./sessionStorage";

const PRODUCTS_NAVIGATION_KEY = "products:navigation";

export type FilterMap = {
    selectedCategories: CategoryItem["value"][],
    sortBy:SortOption,
    maxPrice:number,
    selectedRatings: number[],
    searchQuery: string,
}

export type NavigationContext = {
    scrollY: number;
    filters: Partial<FilterMap>;
    isReturningToResults: boolean;
};

export function storeNavigationState({ filters, scrollY }: { filters: NavigationContext["filters"], scrollY: NavigationContext["scrollY"] }) {
    const context = {
        scrollY,
        filters,
        isReturningToResults: false,
    }
    setSessionItem<NavigationContext>(PRODUCTS_NAVIGATION_KEY, context)
}

export function hasNavigationState() {
    const context = getSessionItem<NavigationContext>(PRODUCTS_NAVIGATION_KEY);
    return context && Object.keys(context).length > 0
}

export function getNavigationState() {
    const context = getSessionItem<NavigationContext>(PRODUCTS_NAVIGATION_KEY);
    if (context) {
        return context;
    }
    return null;
}

export function markReturnToResults() {
    const navigationContext = getNavigationState();
    if (!navigationContext) return;
    const newNavigationContext = {
        ...navigationContext,
        isReturningToResults: true,
    }
    setSessionItem<NavigationContext>(PRODUCTS_NAVIGATION_KEY, newNavigationContext)
}

export function clearProductsNavigationState(){
    removeSessionItem(PRODUCTS_NAVIGATION_KEY)
}