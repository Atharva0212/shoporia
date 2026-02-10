import { useMemo } from "react";
import type { CategoryFilterOption, ProductCard } from "../types";
import { categoryOptions } from "@/src/app/Constants/categories";

export function useCategoryFilterOptions({products}:{products:ProductCard[]}){
      const categoryFilterOptions = useMemo<CategoryFilterOption[]>(() => {
    return categoryOptions.map((category) => ({
      ...category,
      count: products.reduce((acc, curr) => {
        return curr.category === category.value ? acc + 1 : acc;
      }, 0),
    }));
  }, [products]);
  return categoryFilterOptions;
}