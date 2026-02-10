import { useFilters } from "./ProductFiltersContext";
import { FiltersPanel } from "./FiltersPanel";

export function FiltersDrawer() {
  const { isFiltersDrawerOpen, closeFiltersDrawer } = useFilters();
  return (
    <>
      {isFiltersDrawerOpen && (
        <div
          onClick={closeFiltersDrawer}
          className="fixed inset-0 z-40 md:hidden"
        />
      )}

      <aside
        id="filtersDrawer"
        className={`
          fixed top-0 left-0 min-h-screen w-3/4 bg-gray-50 z-50 p-6
          transform transition-transform duration-300 ease-in-out
          md:hidden
          ${isFiltersDrawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <FiltersPanel />
      </aside>
    </>
  );
}