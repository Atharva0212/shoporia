import type { ProductCard } from "../types";

function isWithinPriceRange(priceRange: { minPrice: number, maxPrice: number }) {
    const { minPrice, maxPrice } = priceRange;
    return function (product: ProductCard) {
        return (
            product.minPrice <= maxPrice &&
            product.maxPrice >= minPrice
        )
    };
}

function createQueryFilter(query: string) {
    return function (product: ProductCard) {
        const { name, brand } = product;
        return name.toLowerCase().includes(query) || brand.toLowerCase().includes(query);
    }
}

function createCategoryFilter(categories: ProductCard["category"][]) {
    return function (product: ProductCard) {
        return categories.some(category => category === product.category);
    };
}

function createRatingFilter(selectedRatings: number[]) {
    return function (product: ProductCard) {
        return selectedRatings.some(rating => product.averageRating >= rating);
    }
}

function buildProductFilters({
    query,
    priceRange,
    categories,
    selectedRatings,
}: {
    query: string;
    priceRange?: { minPrice: number; maxPrice: number };
    categories?: ProductCard["category"][];
    selectedRatings?: number[];
}) {
    const predicates: Array<(product: ProductCard) => boolean> = [];

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
        predicates.push(createQueryFilter(normalizedQuery));
    }

    if (categories && categories.length > 0) {
        predicates.push(createCategoryFilter(categories));
    }

    if (selectedRatings && selectedRatings.length > 0) {
        predicates.push(createRatingFilter(selectedRatings))
    }

    if (priceRange) {
        predicates.push(isWithinPriceRange(priceRange))
    };
    return predicates;
}


export function filterProducts({
    products,
    query,
    priceRange,
    categories,
    selectedRatings,
}: {
    products: ProductCard[],
    query: string;
    priceRange?: { minPrice: number; maxPrice: number };
    categories: ProductCard["category"][];
    selectedRatings: number[];
}) {
    const predicates: Array<(product: ProductCard) => boolean> = buildProductFilters({ query, priceRange, categories, selectedRatings });
    if (predicates.length === 0) return products;

    return products.filter((product) => {
        const matchesAllFilters = predicates.every((cb) => cb(product));
        return matchesAllFilters;
    });
}

export function shouldFetchMoreProducts({
    products,
    query,
    priceRange,
    categories,
}: {
    products: ProductCard[];
    query: string;
    priceRange?: { minPrice: number; maxPrice: number };
    categories?: ProductCard["category"][];
}): { shouldFetch: boolean } {
    if (products.length === 0) return { shouldFetch: true };
    const predicates = buildProductFilters({ query, priceRange, categories });
    if (predicates.length === 0) return { shouldFetch: false };

    let matchedCount = 0;
    const MIN_VALID_PRODUCTS = 5;

    for (const product of products) {
        const isValid = predicates.every(predicate => predicate(product));
        if (isValid) {
            matchedCount += 1;
            if (matchedCount >= MIN_VALID_PRODUCTS) break;
        }
    }

    return { shouldFetch: matchedCount < MIN_VALID_PRODUCTS };
}