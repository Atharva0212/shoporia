import { Attributes, Varient } from "../../../types";

export function getVariantFilterOptions(variantList: Varient[]):Attributes[] {
    return variantList.map(item => item.attributes);
}
