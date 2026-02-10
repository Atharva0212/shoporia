import { updateQueryParams } from "@/src/utils/queryParams";
import { MAX_PRICE, MIN_PRICE, STEP } from "../../constants/price";
import { useFilters } from "./ProductFiltersContext";
import { StarRating } from "../../../../Components/StarRating/StarRating";
import Image from "next/image";
import { FILTER_QUERY_PARAMS } from "../../utils/filterQueryParams";

function FiltersPanelHeader() {
  const { activeFiltersCount, clearAllFilters, closeFiltersDrawer } =
    useFilters();
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex-1 flex items-center justify-between text-h5 md:text-h6 font-bold">
        <h3 className="text-text-900">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-body-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            Clear All
          </button>
        )}
      </div>
      <button
        className="md:hidden"
        onClick={closeFiltersDrawer}
        aria-label="Close drawer"
        aria-controls="filtersDrawer"
      >
        <Image src={"/icons/close.svg"} alt="" width={20} height={20} className="w-5 h-5"/>
      </button>
    </div>
  );
}

function CategoryFilter() {
  const { categoryFilterOptions, selectedCategories, toggleCategory } =
    useFilters();
  return (
    <div className="pb-6 border-b border-gray-200">
      <h4 className="text-body font-semibold text-text-900 mb-3">Categories</h4>
      <div className="space-y-2">
        {categoryFilterOptions.map((cat) => (
          <label
            key={cat.value}
            className="flex items-center cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.value)}
              onChange={() => toggleCategory(cat.value)}
              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="ml-3 text-body-sm text-gray-700 group-hover:text-gray-900 flex-1">
              {cat.label}
            </span>
            <span className="text-body-xs text-gray-400">({cat.count})</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function PriceRangeFilter() {
  const { priceRange, updatePriceRange } = useFilters();
  return (
    <div className="pb-6 border-b border-gray-200">
      <h4 className="text-body font-semibold text-text-900 mb-3">Price Range</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-body-sm text-gray-600">
          <span>{priceRange.minPrice}</span>
          <span>{priceRange.maxPrice}</span>
        </div>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
          value={priceRange.maxPrice}
          onKeyDown={(e) => {
            e.preventDefault();

            if (e.key === "ArrowLeft") {
              updatePriceRange((prev) => ({
                ...prev,
                maxPrice: Math.max(prev.maxPrice - STEP, MIN_PRICE),
              }));
            } else if (e.key === "ArrowRight") {
              updatePriceRange((prev) => ({
                ...prev,
                maxPrice: Math.min(prev.maxPrice + STEP, MAX_PRICE),
              }));
            }
          }}
          onChange={(e) =>
            updatePriceRange((prev) => ({
              ...prev,
              maxPrice: parseInt(e.target.value),
            }))
          }
          onMouseUp={(e) =>
            updateQueryParams({
              queryParams: {
                [FILTER_QUERY_PARAMS.MAX_PRICE]:e.currentTarget.value,
              },
            })
          }
          onTouchEnd={(e) =>
            updateQueryParams({
              queryParams: {
                [FILTER_QUERY_PARAMS.MAX_PRICE]:e.currentTarget.value,
              },
            })
          }
          className="w-full focus:outline-none"
        />
      </div>
    </div>
  );
}

function RatingFilter() {
  const { selectedRatings, updateSelectedRatings } = useFilters();
  return (
    <div>
      <h4 className="text-body font-semibold text-text-900 mb-3">Rating</h4>
      <div className="space-y-2">
        {[5, 4, 3].map((rating) => (
          <label
            key={rating}
            className="flex items-center cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => {
                updateSelectedRatings((prev) => {
                  const nextSelectedRatings = prev.includes(rating)
                    ? prev.filter((p) => p !== rating)
                    : [...prev, rating];
                  updateQueryParams({
                    queryParams: {
                      rating: nextSelectedRatings.join(","),
                    },
                  });
                  return nextSelectedRatings;
                });
              }}
              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <div className="ml-3 flex items-center gap-1">
                <StarRating
                rating={rating}
                />
              
              <span className="text-body-sm text-gray-700 ml-1">& up</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export function FiltersPanel() {
  return (
    <div className="space-y-6">
      <FiltersPanelHeader />

      <CategoryFilter />

      <PriceRangeFilter />

      <RatingFilter />
    </div>
  );
}