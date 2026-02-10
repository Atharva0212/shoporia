import { FilterMap } from "./navigationState";

export const FILTER_QUERY_PARAMS = {
  CATEGORY: "category",
  SORT_BY: "sortBy",
  MAX_PRICE: "maxPrice",
  RATING: "rating",
  QUERY: "query",
} as const;

export function buildFilterQueryParams(filters: FilterMap): Partial<Record<typeof FILTER_QUERY_PARAMS[keyof typeof FILTER_QUERY_PARAMS], string>> {
  const { selectedCategories, sortBy, maxPrice, selectedRatings, searchQuery } = filters;
  return {
    ...(selectedCategories && selectedCategories.length > 0 ? { category: selectedCategories.join(",") } : {}),
    ...(sortBy ? { sortBy } : {}),
    ...(maxPrice ? { maxPrice: String(maxPrice) } : {}),
    ...(selectedRatings && selectedRatings.length > 0 ? { rating: selectedRatings.join(",") } : {}),
    ...(searchQuery ? { query: searchQuery } : {}),
  }
}