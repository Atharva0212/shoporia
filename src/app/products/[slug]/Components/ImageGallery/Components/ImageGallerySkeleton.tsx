export function ImageGallerySkeleton() {
  return (
    <div>
      <div className="aspect-square rounded-2xl mb-4 bg-skeleton animate-pulse">
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {Array.from({length:4}).map((_,index) => (
            <div
              key={index}
              className="flex-1 aspect-square overflow-hidden rounded-xl bg-skeleton animate-pulse"
            >
            </div>
          ))}
      </div>
    </div>
  );
}