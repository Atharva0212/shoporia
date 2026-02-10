import { type PropsWithChildren } from "react";
import { ProductFiltersContext, type ProductFiltersContextType } from "./ProductFiltersContext";

export type FiltersProviderProps = ProductFiltersContextType &
  PropsWithChildren;

export function FiltersProvider({
  activeFiltersCount,
  clearAllFilters,
  categoryFilterOptions,
  selectedCategories,
  toggleCategory,
  priceRange,
  updatePriceRange,
  selectedRatings,
  updateSelectedRatings,
  closeFiltersDrawer,
  isFiltersDrawerOpen,
  children,
}: FiltersProviderProps) {
  return (
    <ProductFiltersContext.Provider
      value={{
        activeFiltersCount,
        clearAllFilters,
        categoryFilterOptions,
        selectedCategories,
        toggleCategory,
        priceRange,
        updatePriceRange,
        selectedRatings,
        updateSelectedRatings,
        isFiltersDrawerOpen,
        closeFiltersDrawer,
      }}
    >
      {children}
    </ProductFiltersContext.Provider>
  );
}
