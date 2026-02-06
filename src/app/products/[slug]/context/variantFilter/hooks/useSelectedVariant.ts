import { Attributes } from "@/src/Types/types";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { getAttributes } from "../../../Components/VariantSelector/utils/getAttributes";
import { findVariantFromAttributes } from "../../../Components/VariantSelector/utils/variantSelectors";
import type { ProductDetails } from "../../../types";
import { updateQueryParams } from "@/src/utils/queryParams";

type UseSelectedVariantOptions = {
  variants: ProductDetails["variants"],
}
function resolveVariantFromUrl({ variants, params }: { variants: ProductDetails["variants"], params: ReturnType<typeof useSearchParams> }) {
  const urlAttributes = Object.fromEntries(params.entries());
  if (Object.keys(urlAttributes).length > 0) {
    const matches = filterVariantsByUrlParams({ variants, attributes: urlAttributes });
    if (matches.length > 0) return matches[0];
  }

  return variants.filter(variant => variant.isPrimary)[0];
}
function filterVariantsByUrlParams({ variants, attributes }: { variants: ProductDetails["variants"], attributes: Attributes }) {
  return Object.entries(attributes).reduce((acc, [key, value]) => {
    return acc.filter(item => Object.hasOwn(item.attributes, key) && item.attributes[key] === value)
  }, variants)
}

export function useSelectedVariant({ variants }: UseSelectedVariantOptions) {
  const searchParams = useSearchParams();

  const [selectedVariant, setSelectedVariant] = useState(
    () => resolveVariantFromUrl({ variants, params: searchParams })
  );

  const attributes = useMemo(() => getAttributes(variants), [variants]);

  const updateVariant = useCallback((variantUpdate: Attributes, replace: boolean = false) => {
    const matchedVariant = replace ? findVariantFromAttributes(variants, variantUpdate) : findVariantFromAttributes(variants, {
      ...selectedVariant.attributes,
      ...variantUpdate
    });
    if (matchedVariant) {
      setSelectedVariant(matchedVariant);
      updateQueryParams({queryParams:matchedVariant.attributes});
    }
  }, [variants, selectedVariant])

  return { selectedVariant, attributes, updateVariant }
}