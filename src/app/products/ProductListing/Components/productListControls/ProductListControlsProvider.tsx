import type { PropsWithChildren } from "react";
import {
  ProductListControlsContext,
  type ProductListControlsContextType,
} from "./ProductListControlsContext";

type ProductListControlsProviderProps = ProductListControlsContextType &
  PropsWithChildren;

export function ProductListControlsProvider({
  searchQuery,
  handleSearchChange,
  toggleFiltersDrawer,
  activeFiltersCount,
  sortBy,
  handleSortChange,
  children,
}: ProductListControlsProviderProps) {
  return (
    <ProductListControlsContext.Provider
      value={{
        searchQuery,
        handleSearchChange,
        toggleFiltersDrawer,
        activeFiltersCount,
        sortBy,
        handleSortChange,
      }}
    >
      {children}
    </ProductListControlsContext.Provider>
  );
}
