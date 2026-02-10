export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="flex flex-col">
        <div className="flex items-center p-2">
          <div className="flex-1 rounded-2xl aspect-square bg-skeleton animate-pulse"></div>
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex-1 space-y-4">
            <div className="h-4 w-2/5 bg-skeleton animate-pulse"></div>

            <div className="h-6 w-3/4 bg-skeleton animate-pulse"></div>

            <div className="flex items-center gap-3 mb-3 *:flex-1 *:bg-skeleton *:animate-pulse *:h-4">
              <div></div>
              <div></div>
            </div>

            <div className="animate-pulse bg-skeleton h-4 w-1/2 mb-4"></div>
          </div>

          <div className="mt-auto">
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-1 *:bg-skeleton *:animate-pulse">
                <div className="flex-7 w-2/3 h-8"></div>
                <div className="flex-4 h-8"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-10 bg-skeleton animate-pulse"></div>
              <div className="h-10 bg-skeleton animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}