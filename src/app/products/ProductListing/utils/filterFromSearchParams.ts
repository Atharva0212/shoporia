import { parseMaxPrice, parseSelectedCategories, parseSelectedRatings, parseSortOption } from "./filterParsers";
import { FILTER_QUERY_PARAMS } from "./filterQueryParams";
import { FilterMap } from "./navigationState";

export function getInitialFilterStateFromSearchParams(searchParams: URLSearchParams): FilterMap {
  return {
    selectedCategories: (() => {
      const rawCategoriesParam = searchParams.get(FILTER_QUERY_PARAMS.CATEGORY);      
      if (!rawCategoriesParam) return [];
      const parsedCategories = rawCategoriesParam.split(",");
      return parseSelectedCategories(parsedCategories)
    })(),
    sortBy: (() => {
      const rawSortByParam = searchParams.get(FILTER_QUERY_PARAMS.SORT_BY);
      return parseSortOption(rawSortByParam);
    })(),
    maxPrice: (() => {
      {
        const rawMaxPriceParam = searchParams.get(FILTER_QUERY_PARAMS.MAX_PRICE);
        return parseMaxPrice(rawMaxPriceParam);
      }
    })(),
    selectedRatings: (() => {
      const rawRatingParam = searchParams.get(FILTER_QUERY_PARAMS.RATING);
      if (!rawRatingParam) return [];

      const parsedRatingValues = rawRatingParam.split(",");
      return parseSelectedRatings(parsedRatingValues);
    })(),
    searchQuery: (() => {
      return searchParams.get(FILTER_QUERY_PARAMS.QUERY) ?? "";
    })(),
  };
}