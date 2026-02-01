import { useToast } from "@/src/app/Components/Toast/Context/ToastContext";
import { useVariantFilter } from "../../context/variantFilter/VariantFilterContext";
import { AttributeOption } from "./Components/AttributeOption";

export function VariantSelector() {
  const { attributes } = useVariantFilter();
  const { addToast } = useToast();
  return (
    <div className="space-y-2">
      {Object.keys(attributes).map((key) => (
        <div key={key}>
          {/* Attribute Name */}
          <h4 className="text-body-sm font-medium mb-3 capitalize">{key}</h4>

          {/* Attribute Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {attributes[key].map((value) => (
              <AttributeOption
                key={value}
                attribute={key}
                attributeValue={value}
                addToast={addToast}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
