import { VariantRecordData } from "@/src/lib/db/models/products/ProductVariant.model";
import { Attributes } from "@/src/Types/types";

export function getVariantFilterOptions(variantList: VariantRecordData[]):Attributes[] {
    return variantList.map(item => item.attributes);
}
