export function VariantSelectorSkeleton() {
  return (
      <div aria-label="Variant selector skeleton" className="space-y-3">
        {Array.from({length:2}).map((_,index) => (
          <div key={index}>
            <div className="w-20 mb-3 h-8 rounded-lg bg-skeleton animate-pulse"></div>

            {/* Attribute Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {Array.from({length:3}).map((_,index)=>(
                <div key={index} className="w-24 h-8 rounded-lg bg-skeleton animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
  );
}