import { FiltersPanelSkeleton } from "./FiltersPanelSkeleton";
import { ProductListingCardsSkeleton } from "./ProductListingCardsSkeleton";
import { ToolbarSkeleton } from "./ToolbarSkeleton";

export function ProductListingPageSkeleton() {
  return (
    <div className="bg-surface">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
          <ToolbarSkeleton />
        </div>
      </header>

      <div className="@container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 @3xl:grid-cols-[1fr_3fr] gap-8">
          <FiltersPanelSkeleton />

            <ProductListingCardsSkeleton length={6} />
        </div>
      </div>
    </div>
  );
}
