import { Attributes } from "@/src/Types/types";

function findMatchingVariant(variants: Attributes[], candidateAttribute: Attributes) {
    const [attributeKey, attributeValue] = Object.entries(candidateAttribute)[0];
    return variants.find(
        (variant) =>
            Object.hasOwn(variant, attributeKey) &&
            attributeValue === variant[attributeKey]
    );
}

export function handleVariantSelection(variants: Attributes[], candidateAttribute: Attributes): { success: true, matchedVariant: Attributes } | { success: false, error: "Variant not found." } {
    const matchedVariant = findMatchingVariant(variants, candidateAttribute);
    if (!matchedVariant) {
        return { success: false, error: "Variant not found." };
    }
    return { success: true, matchedVariant }
}