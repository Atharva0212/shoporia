import { Attributes } from "@/src/Types/types";
import { AddToast } from "@/src/app/Components/Toast/types";
import { useVariantFilter } from "../../../context/variantFilter/VariantFilterContext";
import { hasExactVariant, isOptionSelected } from "../utils/variantFilters";
import { handleVariantSelection } from "../utils/variantMatcher";

type AttributeOptionProps<K extends keyof Attributes> = {
  attribute: K;
  attributeValue: Attributes[K];
  addToast:AddToast;
};

export function AttributeOption<K extends keyof Attributes>({
  attribute,
  attributeValue,
  addToast,
}: AttributeOptionProps<K>) {
  const { selectedVariant, variantFilters, updateVariant } = useVariantFilter();
  const { attributes } = selectedVariant;
  const candidateOption = { [attribute]: attributeValue };
  const isMatchingVariant = hasExactVariant(
    variantFilters,
    attributes,
    candidateOption,
  );
  const isSelected = isOptionSelected(
    selectedVariant.attributes,
    candidateOption,
  );

  function handleVariantClick() {
    if (isMatchingVariant) {
      updateVariant(candidateOption);
      return;
    } else {
      const candidateCheck = handleVariantSelection(
        variantFilters,
        candidateOption,
      );
      if (!candidateCheck.success) {
        addToast("No variant found","warning");
        return;
      }
      updateVariant(candidateCheck.matchedVariant, true);
    }
  }

  return (
    <button
      key={attributeValue}
      onClick={handleVariantClick}
      aria-label={"Select variant"}
      className={`
        text-body
                  px-6 py-3 border-2 rounded-xl font-medium transition
                  ${
                    !isMatchingVariant
                      ? "opacity-40 line-through"
                      : "border-divider-300 hover:border-divider-400 text-text-700"
                  }
                  ${
                    isSelected ? "border-divider-900 bg-inverse text-white" : ""
                  }
                `}
    >
      {attributeValue}
    </button>
  );
}
