import { useCallback, useEffect, useMemo, useState } from "react";
import { getAttributes } from "../../../Components/VariantSelector/utils/getAttributes";
import { findVariantFromAttributes } from "../../../Components/VariantSelector/utils/variantSelectors";
import type { ProductDetails } from "../../../types";
import { Attributes } from "@/src/Types/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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

function syncVariantToUrl({ attributes }: { attributes: ProductDetails["variants"][number]["attributes"] }){
const params=new URLSearchParams();
Object.entries(attributes).forEach(([key,value])=>{
  params.set(key,String(value));
})
window.history.replaceState(null,"",`?${params.toString()}`)
}

export function useVariantUrlSync({ searchParams }: { searchParams: ReturnType<typeof useSearchParams> }) {
  const router = useRouter();
  const pathname = usePathname();
  const syncVariantToUrl = useCallback(({ attributes }: { attributes: ProductDetails["variants"][number]["attributes"] }) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(attributes).forEach(([key, value]) => {
      params.set(key, String(value));
    })
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false
    });
  }, [router, pathname, searchParams]);
  return { syncVariantToUrl }
};

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
      syncVariantToUrl({attributes:matchedVariant.attributes});
    }
  }, [variants, selectedVariant])

  return { selectedVariant, attributes, updateVariant }
}