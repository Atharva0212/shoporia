export function buildProductCacheKey({
  category,
  maxPrice,
  query,
}: {
  category?: string;
  maxPrice?: number;
  query?: string;
}) {
  return `${category?.toString() ?? ""}::${maxPrice}::${query ?? ""}`;
}
