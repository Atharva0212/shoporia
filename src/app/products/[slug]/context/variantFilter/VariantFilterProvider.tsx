"use client";

import { useMemo, type PropsWithChildren } from "react";
import { getVariantFilterOptions } from "../../Components/VariantSelector/utils/getVariantFilterOptions";
import { VariantFilterContext } from "./VariantFilterContext";
import { useSelectedVariant } from "./hooks/useSelectedVariant";
import { ProductDetails } from "../../types";

type VariantFilterProviderProps = PropsWithChildren & {
  variants: ProductDetails["variants"];
};

export function VariantFilterProvider({
  children,
  variants,
}: VariantFilterProviderProps) {
  const variantFilters = useMemo(
    () => getVariantFilterOptions(variants),
    [variants]
  );

  const { selectedVariant, attributes, updateVariant } = useSelectedVariant({variants});
  return (
    <VariantFilterContext.Provider
      value={{ selectedVariant, variantFilters, attributes, updateVariant }}
    >
      {children}
    </VariantFilterContext.Provider>
  );
}
