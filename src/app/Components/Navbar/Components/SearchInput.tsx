import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getSearchResults, SearchResultItem } from "../utils/searchResults";
import { useDebounce } from "@/src/hooks/useDebounce";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { SearchSuggestionsList } from "./SearchSuggestionsList";
import { FILTER_QUERY_PARAMS } from "@/src/app/products/ProductListing/utils/filterQueryParams";

export function SearchInput({ className }: { className?: string }) {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const [isSuggestionListOpen, setIsSuggestionListOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();

  const filteredItems = useMemo(
    function () {
      return getSearchResults(debouncedSearchInput);
    },
    [debouncedSearchInput],
  );
  const debouncedSearchChange = useDebounce(handleDebouncedSearchChange);
  function handleDebouncedSearchChange(input: string) {
    setDebouncedSearchInput(input);
  }

  function handleSelect(searchItem: SearchResultItem) {
    const { type, key } = searchItem;
    if (type === "category") {
      router.push(`/products?${FILTER_QUERY_PARAMS.CATEGORY}=${key}`);
    } else if (type === "product") {
      router.push(`/products/${key}`);
    }
  }

  return (
    <div className={twMerge("relative max-w-xl w-full", className)}>
      <input
        type="text"
        role="combobox"
        aria-expanded={isSuggestionListOpen}
        aria-controls="search-bar-suggestions"
        aria-activedescendant={
          activeIndex > 0 ? String(activeIndex) : undefined
        }
        aria-autocomplete="list"
        placeholder="Search products, categories..."
        value={searchInput}
        onChange={(e) => {
          const value = e.target.value;
          setSearchInput(value);
          setIsSuggestionListOpen(true);
          setActiveIndex(-1);
          debouncedSearchChange(value);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          }
          if (e.key === "ArrowDown") {
            setActiveIndex((prev) =>
              Math.min(prev + 1, filteredItems.length - 1),
            );
          }
          if (e.key === "Enter") {
            const activeItem = filteredItems[activeIndex];
            if (activeItem) {
              handleSelect(activeItem);
            }
          }
          if (e.key === "Escape") {
            setIsSuggestionListOpen(false);
            setActiveIndex(-1);
          }
        }}
        className="w-full pl-12 pr-4 py-2 text-text-500 border border-divider-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-body"
      />
      <div className="w-5 h-5 text-gray-400 absolute left-4 top-2.5">
        <Image src={"/icons/search.svg"} alt="Search" width={20} height={20} />
      </div>
      {isSuggestionListOpen && filteredItems.length > 0 && (
        <SearchSuggestionsList
          filteredItems={filteredItems}
          activeIndex={activeIndex}
          handleSelect={handleSelect}
        />
      )}
    </div>
  );
}