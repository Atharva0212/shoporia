import { Logo } from "@/src/app/Components/Logo";
import Image from "next/image";
import { useProductListControls } from "./ProductListControlsContext";

function ProductSortSelect() {
  const { sortBy, handleSortChange } = useProductListControls();
  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="text-center px-4 py-2 border appearance-none pr-7 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 text-body-sm font-medium  bg-white"
      >
        <option value="price-high">Price: ↑</option>
        <option value="price-low">Price: ↓</option>
        <option value="top-rated">Top Rated</option>
      </select>
      <span className="absolute pointer-events-none top-1/2 -translate-y-1/2 right-3 text-gray-500 text-xs">
        ▼
      </span>
    </div>
  );
}

function ProductSearchInput() {
  const { searchQuery, handleSearchChange } = useProductListControls();
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-body-sm w-full"
      />
      <Image src={"/icons/search-gray.svg"} alt="" width={16} height={16} className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
    </div>
  );
}

function ProductFiltersButton() {
  const { toggleFiltersDrawer, activeFiltersCount } = useProductListControls();
  return (
    <button
      onClick={toggleFiltersDrawer}
      className="flex min-w-24 px-2 items-center justify-center gap-1.5 py-2 border border-gray-300 rounded-full hover:bg-gray-50 text-body-sm font-medium"
    >
      <Image src={"/icons/sliders-horizontal.svg"} alt="" width={16} height={16} className="w-4 h-4" />
      <span>Filters</span>
      {activeFiltersCount > 0 && (
        <span className="bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
}

function ToolbarCompact() {
  return (
    <div className="space-y-4">
      <div className="sm:hidden flex items-center justify-between gap-4 md:gap-6">
        <Logo />
        <ProductFiltersButton />
      </div>

      <div className="sm:hidden flex items-center gap-4">
        <ProductSearchInput />
        <ProductSortSelect />
      </div>
    </div>
  );
}

function ToolbarExpanded() {
  return (
    <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-4 md:gap-6">
      <Logo />
      <ProductSearchInput />
      <ProductFiltersButton />
      <ProductSortSelect />
    </div>
  );
}

export function Toolbar() {
  return (
    <>
      <ToolbarExpanded />
      <ToolbarCompact />
    </>
  );
}