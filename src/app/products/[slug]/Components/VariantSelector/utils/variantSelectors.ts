import { Attributes } from "@/src/Types/types";
import { ProductDetails } from "../../../types";

export function findVariantFromAttributes(variants: ProductDetails["variants"], variantUpdate: Attributes): ProductDetails["variants"][number] | null {
    const matchingVariant = variants.find(varient =>
        Object.entries(varient.attributes).every(([key, value]) =>
            Object.hasOwn(variantUpdate, key) && value === variantUpdate[key]));
    return matchingVariant ?? null
}