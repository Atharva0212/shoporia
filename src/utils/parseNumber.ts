export function parseNumber<T>(value: unknown, fallback: T): number | T {
  if (!value) return fallback;

  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}