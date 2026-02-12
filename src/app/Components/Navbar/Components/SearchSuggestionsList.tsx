import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  RankedCategory,
  RankedProduct,
  SearchResultItem,
} from "../utils/searchResults";

type SearchSuggestionsListProps = {
  filteredItems: SearchResultItem[];
  activeIndex: number;
  handleSelect: (searchItem: SearchResultItem) => void;
};

export function SearchSuggestionsList({
  filteredItems,
  activeIndex,
  handleSelect,
}: SearchSuggestionsListProps) {
  return (
    <ul
      id="search-bar-suggestions"
      role="listbox"
      className="absolute border w-full top-full mt-2 bg-white rounded-xl shadow-xl border-gray-200 max-h-[40vh] overflow-y-auto z-50"
    >
      {filteredItems.map((item, index) => (
        <SearchSuggestionRow
          key={index}
          item={item}
          activeIndex={activeIndex}
          index={index}
          handleSearch={handleSelect}
        />
      ))}
    </ul>
  );
}

type SearchSuggestionRowProps = {
  item: SearchResultItem;
  activeIndex: number;
  index: number;
  handleSearch: (searchItem: SearchResultItem) => void;
};

function SearchSuggestionRow({
  item,
  activeIndex,
  index,
  handleSearch,
}: SearchSuggestionRowProps) {
  const rowRef = useRef<HTMLLIElement | null>(null);
  useEffect(
    function () {
      if (activeIndex === index) {
        rowRef.current?.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    },
    [activeIndex, index],
  );
  // if (item.type === "product") {
  return (
    <li
      role="option"
      id={`search-result-${index}`}
      aria-selected={index === activeIndex}
      ref={rowRef}
      className={`${activeIndex === index ? "bg-gray-100" : ""}`}
      key={item.key}
    >
      {item.type === "product" ? (
        <ProductSuggestionRow item={item} handleSearch={handleSearch} />
      ) : (
        <CategorySuggestionRow item={item} handleSearch={handleSearch} />
      )}
    </li>
  );
}

function ProductSuggestionRow({
  item,
  handleSearch,
}: {
  item: RankedProduct;
  handleSearch: (searchItem: SearchResultItem) => void;
}) {
  return (
    <button
      key={item.key}
      onClick={() => handleSearch(item)}
      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition"
    >
      <div className="w-12 h-12 shrink-0 bg-white rounded-xl overflow-hidden border border-gray-200">
        <Image
          src={item.thumbnail}
          alt={item.productName}
          width={50}
          height={50}
          className="w-full h-full object-cover aspect-square bg-skeleton"
        />
      </div>
      <div className="flex-1 text-left">
        <p className="font-semibold text-gray-900 text-sm line-clamp-1">
          {item.productName}
        </p>
        <p className="text-xs text-gray-500">{item.brand}</p>
      </div>
      <Image src={"/icons/arrow.svg"} alt="" height={16} width={16} className="w-4 h-4 text-gray-400" />
    </button>
  );
}

function CategorySuggestionRow({
  item,
  handleSearch,
}: {
  item: RankedCategory;
  handleSearch: (searchItem: SearchResultItem) => void;
}) {
  return (
    <button
      key={item.key}
      onClick={() => handleSearch(item)}
      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition"
    >
      <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={50}
          height={50}
          className="w-full h-full object-cover aspect-square bg-gray-400 p-1.5"
        />
      </div>
      <div className="flex-1 text-left">
        <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
        <p className="text-xs text-gray-500">Category</p>
      </div>
      <Image src={"/icons/arrow.svg"} alt="" height={16} width={16} className="w-4 h-4 text-gray-400" />
    </button>
  );
}
