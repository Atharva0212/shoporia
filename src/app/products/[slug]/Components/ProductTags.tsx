import { ProductDetails } from "../types";

type ProductTagsProps = {
  tags: ProductDetails["tags"];
};

export function ProductTags({ tags }: ProductTagsProps) {
  return (
    <>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}