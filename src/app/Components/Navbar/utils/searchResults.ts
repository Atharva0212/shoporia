import { categories } from "@/src/app/Constants/categories";
import { searchProduct, SearchProduct } from "../Constants/searchProducts";

type Ranked<T extends object> = {
  score: number;
} & T;

export type RankedProduct = Ranked<SearchProduct & { type: "product" }>;

type CategoriesMap = typeof categories;

type CategoryItem = {
  key: keyof CategoriesMap;
  type: "category",
  name: CategoriesMap[keyof CategoriesMap]["name"];
  image: CategoriesMap[keyof CategoriesMap]["image"];
};

export type RankedCategory = Ranked<CategoryItem>;


function filterCategory(input: string): RankedCategory[] {
  const inputValue = input.trim().toLowerCase();
  if (!inputValue) return [];

  const results: RankedCategory[] = [];

  const categoryEntries = Object.entries(categories) as [
    keyof typeof categories,
    (typeof categories)[keyof typeof categories]
  ][];

  for (const [categoryId, categoryData] of categoryEntries) {
    const categoryName = categoryData.name.toLowerCase();
    const matchIndex = categoryName.indexOf(inputValue);

    if (matchIndex !== -1) {
      const positionScore = 1 - matchIndex / categoryName.length;
      const lengthScore = inputValue.length / categoryName.length;

      const score = positionScore * 0.7 + lengthScore * 0.3;

      results.push({
        key: categoryId,
        type: "category",
        name: categoryData.name,
        image: categoryData.image,
        score,
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

function getBestMatch(
  fields: { text: string; index: number }[]
) {
  const valid = fields.filter(f => f.index >= 0);
  if (!valid.length) return null;

  return valid.reduce((best, curr) =>
    curr.index < best.index ? curr : best
  );
}


function filterProducts(input: string): RankedProduct[] {
  const inputValue = input.trim().toLowerCase();
  if (!inputValue) return [];

  const results: RankedProduct[] = [];

  const searchableFields: (keyof SearchProduct)[] = ["productName", "brand"] as const;

  for (const product of searchProduct) {
    const fieldMatches = searchableFields.map(field => {
      const fieldValue = product[field].toLowerCase();
      return {
        text: fieldValue, index: fieldValue.indexOf(inputValue)
      }
    })

    const bestMatch = getBestMatch(fieldMatches);

    if (bestMatch) {
      const { text, index } = bestMatch;
      const positionScore = 1 - index / text.length;
      const lengthScore = inputValue.length / text.length;

      const score = positionScore * 0.7 + lengthScore * 0.3;

      results.push({
        ...product,
        type: "product",
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

export type SearchResultItem = RankedCategory | RankedProduct;

export function getSearchResults(input: string): SearchResultItem[] {
  const filteredProducts = filterCategory(input);
  const filteredCategory = filterProducts(input);

  let i = 0, j = 0;
  const merged = [];
  while (i < filteredProducts.length && j < filteredCategory.length) {
    if (filteredProducts[i].score > filteredCategory[j].score) {
      merged.push(filteredProducts[i]);
      i++;
    } else {
      merged.push(filteredCategory[j]);
      j++;
    }
  }

  while (i < filteredProducts.length) {
    merged.push(filteredProducts[i]);
    i++;
  }

  while (j < filteredCategory.length) {
    merged.push(filteredCategory[j]);
    j++;
  }

  return merged.slice(0, 10);
}