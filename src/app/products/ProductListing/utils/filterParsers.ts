import { CategoryItem, categoryOptions } from "@/src/app/Constants/categories";
import { sortOptions } from "../constants/sortOptions";
import { SortOption } from "../types";
import { MAX_PRICE } from "../constants/price";
import { parseNumber } from "@/src/utils/parseNumber";

export function parseSelectedCategories(rawCategories: string[]) {
  return rawCategories.filter((categoryValue) =>
    categoryOptions.some((category) => category.value === categoryValue),
  ) as CategoryItem["value"][];
}

export function parseSortOption(rawSortByParam: string | null | undefined): SortOption {
  if (!rawSortByParam) return "top-rated";

  const isValid = sortOptions.includes(rawSortByParam as SortOption);

  return isValid ? (rawSortByParam as SortOption) : "top-rated";
}

export function parseMaxPrice(rawMaxPriceParam: unknown | undefined) {
  return parseNumber<number>(rawMaxPriceParam, MAX_PRICE)
}

export function parseSelectedRatings(rawRatingParam: (number | string)[]) {
  const allowedRatings = [3, 4, 5];

  const validRatings = rawRatingParam
    .map((value) => parseNumber(value, null))
    .filter(
      (num): num is number => num !== null && allowedRatings.includes(num),
    );

  return validRatings;
}