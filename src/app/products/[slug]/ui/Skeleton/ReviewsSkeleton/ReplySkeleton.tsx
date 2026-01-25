export function ReplySkeleton() {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 p-4 animate-pulse">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-skeleton" />

      {/* Content */}
      <div className="space-y-2">
        <div className="h-4 w-1/5 bg-skeleton rounded" />
        <div className="h-3 w-full bg-skeleton rounded" />
        <div className="h-3 w-5/6 bg-skeleton rounded" />
      </div>
    </div>
  );
}
