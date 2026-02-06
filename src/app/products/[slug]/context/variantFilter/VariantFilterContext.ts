"use client";

import { createContext, useContext } from "react";
import type { useSelectedVariant } from "./hooks/useSelectedVariant";
import type { getVariantFilterOptions } from "../../Components/VariantSelector/utils/getVariantFilterOptions";

type VariantFilterContextType=ReturnType<typeof useSelectedVariant>&{variantFilters:ReturnType<typeof getVariantFilterOptions>};

export const VariantFilterContext=createContext<VariantFilterContextType|null>(null);

export function useVariantFilter(){
    const context=useContext(VariantFilterContext);
    if(!context){
        throw new Error("useVariantFilter must be used within a VariantFilterProvider")
    }
    return context;
}