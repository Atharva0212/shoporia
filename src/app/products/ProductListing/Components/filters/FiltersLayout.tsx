import { FiltersDrawer } from "./FiltersDrawer";
import { FiltersPanel } from "./FiltersPanel";

export function FiltersLayout() {
  return (
    <>
      <aside className="hidden @3xl:block max-h-min bg-white rounded-2xl p-6 sticky top-24 border border-gray-200">
        <FiltersPanel />
      </aside>
      <FiltersDrawer />
    </>
  );
}