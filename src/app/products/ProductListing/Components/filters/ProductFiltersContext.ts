import { createContext, useContext } from "react";
import type { useProductListingFilters } from "../../hooks/useProductListingFilters";
import type { CategoryFilterOption, PriceRange } from "../../types";
import { CategoryItem } from "@/src/app/Constants/categories";

export type ProductFiltersContextType = {
  activeFiltersCount: number;
  clearAllFilters: () => void;
  categoryFilterOptions: CategoryFilterOption[];
  selectedCategories: CategoryItem["value"][];
  toggleCategory: (value: CategoryItem["value"]) => void;
  priceRange: PriceRange;
  updatePriceRange: ReturnType<
    typeof useProductListingFilters
  >["updatePriceRange"];
  selectedRatings: ReturnType<
    typeof useProductListingFilters
  >["selectedRatings"];
  updateSelectedRatings: ReturnType<
    typeof useProductListingFilters
  >["updateSelectedRatings"];
  isFiltersDrawerOpen:boolean;
  closeFiltersDrawer:()=>void;
};

export const ProductFiltersContext = createContext<ProductFiltersContextType | null>(
  null,
);

export const useFilters = () => {
  const context = useContext(ProductFiltersContext);
  if (!context)
    throw new Error("useFilters must be used within a FiltersProvider");
  return context;
};