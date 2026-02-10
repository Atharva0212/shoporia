import { createContext, useContext } from "react";
import type { SortOption } from "../../types";

export type ProductListControlsContextType = {
  searchQuery: string;
  handleSearchChange: (value: string) => void;
  toggleFiltersDrawer: () => void;
  activeFiltersCount: number;
  sortBy: SortOption;
  handleSortChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}

export const ProductListControlsContext = createContext<ProductListControlsContextType | null>(null);

export function useProductListControls() {
  const context = useContext(ProductListControlsContext);
  if (!context) {
    throw new Error(
      "useProductListControls must be used within a ProductListControlsProvider"
    );
  }
  return context;
}
