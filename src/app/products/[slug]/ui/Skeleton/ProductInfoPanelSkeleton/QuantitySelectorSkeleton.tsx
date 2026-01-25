export function QuantitySelectorSkeleton() {
  return (
    <div aria-label="Quantity Selector Loading" aria-busy={true} className="animate-pulse w-full">

      <div aria-hidden="true" className="h-8 w-24 bg-skeleton rounded mb-3" />

      <div aria-hidden="true" className="flex w-2/3 gap-2 ">
        <div aria-hidden="true" className="flex-1 h-12 bg-skeleton rounded-l-xl" />
        <div aria-hidden="true" className="flex-1 h-12 bg-skeleton" />
        <div aria-hidden="true" className="flex-1 h-12 bg-skeleton rounded-r-xl" />
      </div>
    </div>
  );
}
