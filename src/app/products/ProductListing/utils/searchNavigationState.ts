import { getInitialFilterStateFromSearchParams } from "./filterFromSearchParams";
import { parseMaxPrice, parseSelectedCategories, parseSelectedRatings, parseSortOption } from "./filterParsers";
import { clearProductsNavigationState, FilterMap, getNavigationState, NavigationContext } from "./navigationState";

export function getSearchNavigationState(searchParams: URLSearchParams): Omit<NavigationContext, "filters"> & { filters: FilterMap } | { isReturningToResults: false, filters: FilterMap } {
  const navigationContext = getNavigationState();
  if (navigationContext && navigationContext.isReturningToResults) {
    clearProductsNavigationState()
    const { selectedCategories, sortBy, maxPrice, selectedRatings, searchQuery } = navigationContext.filters;
    return {
      ...navigationContext,
      filters: {
        selectedCategories: selectedCategories && selectedCategories.length > 0 ? parseSelectedCategories(selectedCategories) : [],
        sortBy: parseSortOption(sortBy),
        maxPrice: parseMaxPrice(maxPrice),
        selectedRatings: selectedRatings && selectedRatings.length > 0 ? parseSelectedRatings(selectedRatings) : [],
        searchQuery: searchQuery ?? "",
      }
    };
  }
  return { isReturningToResults: false, filters: getInitialFilterStateFromSearchParams(searchParams) }
}