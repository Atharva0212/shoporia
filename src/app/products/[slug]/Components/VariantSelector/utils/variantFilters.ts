import { Attributes } from "../../../types";

export function hasExactVariant(
    variants: Attributes[],
    currentSelection: Attributes,
    candidateOption: Attributes,
): boolean {
    const [candidateKey, candidateValue] = Object.entries(candidateOption)[0];
    const candidate = { ...currentSelection, [candidateKey]: candidateValue };
    return variants.some((variant) => {
        return Object.entries(candidate).every(
            ([key, value]) => Object.hasOwn(variant, key) && variant[key] === value
        );
    });

}

export function isOptionSelected(selectedVariant: Attributes, candidateOption: Attributes) {
    const [candidateKey, candidateValue] = Object.entries(candidateOption)[0];    
    return Object.hasOwn(selectedVariant, candidateKey) && selectedVariant[candidateKey] === candidateValue;
}
