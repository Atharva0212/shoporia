import { CategoryItem } from "@/src/app/Constants/categories";
import { useAppDispatch, useAppSelector } from "@/src/app/store/hooks";
import { clearQueryParams, getSearchParams, updateQueryParams } from "@/src/utils/queryParams";
import { useCallback, useEffect, useState } from "react";
import { MAX_PRICE, MIN_PRICE } from "../constants/price";
import { updateProductFilters } from "../features/productListFilters.slice";
import type { PriceRange, ProductListingQueryParams, SortOption } from "../types";
import { buildFilterQueryParams, FILTER_QUERY_PARAMS } from "../utils/filterQueryParams";
import { getSearchNavigationState } from "../utils/searchNavigationState";
import { useDebounce } from "./useDebounce";

export function useProductListingFilters({ updatedAtCursor }: { updatedAtCursor: number }) {
  const productListFilters = useAppSelector(state => state.productListFilters)
  const dispatch = useAppDispatch();

  const [initialResultsState] = useState(() => {
    const searchParams = getSearchParams();
    return getSearchNavigationState(searchParams);
  });

  useEffect(() => {
    const { isReturningToResults,filters } = initialResultsState;
    updateQueryParams({ queryParams: buildFilterQueryParams(filters) });
    if (!isReturningToResults) return
    const { scrollY } = initialResultsState;
    window.scrollTo({ top: scrollY, behavior: "auto" });
  }, [initialResultsState])

  const [baseQueryParams] = useState<ProductListingQueryParams>(() => {
    if (productListFilters.initialized) {
      return productListFilters.filters;
    }

    const initialProductListParams = {
      updatedAt: updatedAtCursor,
      category: initialResultsState.filters.selectedCategories.join(","),
      maxPrice: initialResultsState.filters.maxPrice,
      query: initialResultsState.filters.searchQuery,
    }

    dispatch(updateProductFilters(initialProductListParams))
    return initialProductListParams;
  });

  const [priceRange, setPriceRange] = useState<PriceRange>(() => ({
    minPrice: MIN_PRICE,
    maxPrice: initialResultsState.filters.maxPrice
  }));
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryItem["value"][]
  >(() => initialResultsState.filters.selectedCategories);

  const [selectedRatings, setSelectedRatings] = useState<number[]>(() => initialResultsState.filters.selectedRatings);

  const [searchQuery, setSearchQuery] = useState(() => initialResultsState.filters.searchQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(() => initialResultsState.filters.searchQuery);
  const [sortBy, setSortBy] = useState<SortOption>(() => initialResultsState.filters.sortBy);

  const clearAllFilters = useCallback(function () {
    setSelectedCategories([]);
    setSelectedRatings([]);
    setPriceRange({ minPrice: MIN_PRICE, maxPrice: MAX_PRICE });
    setSearchQuery("");
    setDebouncedSearchQuery("");
    clearQueryParams();
  }, []);

  const handleSearchQueryChange = useCallback(function (searchInput: string) {
    setDebouncedSearchQuery(searchInput);
    updateQueryParams({ queryParams: { [FILTER_QUERY_PARAMS.QUERY]: searchInput } });
  }, [])

  const debouncedSearchQueryChange = useDebounce(handleSearchQueryChange, 230);

  const updateCategories = useCallback(function (categories: CategoryItem["value"][]) {
    setSelectedCategories(categories);
  }, [])

  const handleSearchChange = useCallback(function (value: string) {
    setSearchQuery(value);
    debouncedSearchQueryChange(value);
  }, [debouncedSearchQueryChange])

  const applySort = useCallback(function (selectedSort: SortOption) {
    setSortBy(selectedSort);
    updateQueryParams({ queryParams: { [FILTER_QUERY_PARAMS.SORT_BY]: selectedSort } });
  }, []);

  function updatePriceRange(updaterFn: (prevValue: PriceRange) => PriceRange) {
    setPriceRange(prev => updaterFn(prev));
  }

  const updateSelectedRatings = useCallback(function (updaterFn: (prevValue: number[]) => number[]) {
    setSelectedRatings(prev => updaterFn(prev));
  }, []);

  return { baseQueryParams, priceRange, selectedCategories, selectedRatings, searchQuery, debouncedSearchQuery, sortBy, clearAllFilters, updateCategories, handleSearchChange, applySort, updatePriceRange, updateSelectedRatings }
}