import { VariantRecordData } from "@/src/lib/db/models/products/ProductVariant.model";

export function getAttributes(variantList: VariantRecordData[]) {
    const attributes: Record<string, Set<string | number>> = {};

  variantList.forEach((variant) => {
    const entries = Object.entries(variant.attributes);
    entries.forEach(([key, value]) => {
      if (!attributes[key]) {
        attributes[key] = new Set();
      }

      attributes[key].add(value);
    });
  });
  const result: Record<string, Array<string | number>> = {}
    Object.keys(attributes).forEach(key => {
        result[key] = [...attributes[key]]
    });
    return result;
}