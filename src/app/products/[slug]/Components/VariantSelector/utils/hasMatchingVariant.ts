import { Attributes } from "../../../types";
import type { getVariantFilterOptions } from "./getVariantFilterOptions";

export function hasMatchingVariant(variant: ReturnType<typeof getVariantFilterOptions>, filterable: Attributes) {
    const filterKey = Object.keys(filterable)[0];
    return variant.some(item => {
        return Object.entries(item).some(([optionKey, optionValue]) => {
            return Object.hasOwn(item, filterKey) && optionValue === filterable[optionKey]
        })
    })
}