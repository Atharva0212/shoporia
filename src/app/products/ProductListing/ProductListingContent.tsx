"use client";

import { updateQueryParams } from "@/src/utils/queryParams";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { CategoryItem } from "../../Constants/categories";
import {
  addToCart,
  CartItem,
  removeProductFromCart,
} from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../store/hooks";
import { FiltersLayout } from "./Components/filters/FiltersLayout";
import { FiltersProvider } from "./Components/filters/ProductFiltersProvider";
import { ProductCardItem } from "./Components/ProductCardItem";
import { ProductListControlsProvider } from "./Components/productListControls/ProductListControlsProvider";
import { Toolbar } from "./Components/productListControls/Toolbar";
import { ProductCardSkeleton } from "./Components/ui/Skeleton/ProductCardSkeleton";
import { ProductListingPageSkeleton } from "./Components/ui/Skeleton/ProductListingPageSkeleton";
import { MAX_PRICE, MIN_PRICE } from "./constants/price";
import { sortOptions } from "./constants/sortOptions";
import { useGetProductsQuery } from "./features/productListingApi";
import { useCategoryFilterOptions } from "./hooks/useCategoryFilterOptions";
import { useFetchProducts } from "./hooks/useFetchProducts";
import { useProductListingFilters } from "./hooks/useProductListingFilters";
import type {
  ProductCard,
  ProductListingQueryParams,
  ProductListingState,
  SortOption,
} from "./types";
import { FilterMap, storeNavigationState } from "./utils/navigationState";
import { hasQueryInCache } from "./utils/productCache";
import {
  filterProducts,
  shouldFetchMoreProducts,
} from "./utils/productFilters";

function canLoadMoreProducts({
  categories,
  maxPrice,
  searchQuery,
  filterCache,
  defaultValue = false,
}: {
  categories: CategoryItem["value"][];
  maxPrice: number;
  searchQuery: string;
  filterCache: ProductListingState["filterCache"];
  defaultValue?: boolean;
}) {
  const cacheResult = hasQueryInCache({
    categories,
    maxPrice,
    query: searchQuery,
    filterCache,
  });

  if (cacheResult.hasCache) {
    return cacheResult.cacheEntry.hasMore;
  }
  return defaultValue;
}

const productSorters: Record<
  SortOption,
  (products: ProductCard[]) => ProductCard[]
> = {
  "price-low": (products: ProductCard[]) =>
    [...products].sort((a, b) => a.minPrice - b.minPrice),

  "price-high": (products: ProductCard[]) =>
    [...products].sort((a, b) => b.maxPrice - a.maxPrice),

  "top-rated": (products: ProductCard[]) =>
    [...products].sort((a, b) => b.averageRating - a.averageRating),
};

function sortProducts(products: ProductCard[], sortBy: SortOption) {
  return productSorters[sortBy] ? productSorters[sortBy](products) : products;
}

function mapProductToCartItem(
  product: ProductCard,
  selectedVariant: ProductCard["variants"][number],
): CartItem {
  const { productId,slug, name, image } = product;
  const { attributes, price, originalPrice,sku, stock } = selectedVariant;
  return {
    productId,
    slug,
    productName: product.name,
    image: {
      src: image,
      alt: name,
    },
    variantAttributes: attributes,
    sku,
    price,
    originalPrice,
    quantity: 1,
    stock,
  };
}

export function ProductListingContent({
  updatedAtCursor,
}: {
  updatedAtCursor: number;
}) {
  const {
    baseQueryParams,
    priceRange,
    selectedCategories,
    selectedRatings,
    searchQuery,
    debouncedSearchQuery,
    sortBy,
    clearAllFilters,
    updateCategories,
    handleSearchChange,
    applySort,
    updatePriceRange,
    updateSelectedRatings,
  } = useProductListingFilters({ updatedAtCursor });

  const {
    data: listingData,
    isLoading,
    isFetching: isRefreshing,
    isError,
    error,
    refetch,
  } = useGetProductsQuery(baseQueryParams);
  const { products, filterCache } = listingData ?? {
    products: [],
    filterCache: {},
  };

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [showLoadMore, setShowLoadMore] = useState(() =>
    canLoadMoreProducts({
      categories: selectedCategories,
      maxPrice: priceRange.maxPrice,
      searchQuery,
      filterCache,
      defaultValue: true,
    }),
  );

  const updateShowLoadMore = useCallback(function (isVisible: boolean) {
    setShowLoadMore(isVisible);
  }, []);

  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);

  const toggleFiltersDrawer = useCallback(() => {
    setIsFiltersDrawerOpen((prev) => !prev);
  }, []);
  const closeFiltersDrawer = useCallback(() => {
    setIsFiltersDrawerOpen(false);
  }, []);

  const { fetchProducts, isFetching } = useFetchProducts({
    categories: selectedCategories,
    maxPrice: priceRange.maxPrice,
    query: searchQuery,
  });

  const loadProducts = useCallback(
    function ({
      categories,
      maxPrice,
      query,
    }: {
      categories: CategoryItem["value"][];
      maxPrice: number;
      query: string;
    }) {
      const cacheResult = hasQueryInCache({
        categories,
        maxPrice,
        query,
        filterCache,
      });

      let params: ProductListingQueryParams = {
        updatedAt: updatedAtCursor,
        category: categories.join(","),
        maxPrice,
        query,
      };
      if (cacheResult.hasCache) {
        if (!cacheResult.cacheEntry.hasMore) return;
        const { updatedAt, id } = cacheResult.cacheEntry.cursor;
        params = {
          ...params,
          updatedAt,
          id,
        };
      }

      fetchProducts({ params, baseQueryParams, updateShowLoadMore });
    },
    [
      filterCache,
      updatedAtCursor,
      fetchProducts,
      baseQueryParams,
      updateShowLoadMore,
    ],
  );

  const ensureMoreProducts = useCallback(
    function ({
      categories,
      maxPrice,
      query,
    }: {
      categories: CategoryItem["value"][];
      maxPrice: number;
      query: string;
    }) {
      const { shouldFetch } = shouldFetchMoreProducts({
        products,
        query,
        categories,
        priceRange: { minPrice: MIN_PRICE, maxPrice },
      });

      if (!shouldFetch) return;

      loadProducts({ categories, maxPrice, query });
    },
    [products, loadProducts],
  );

  const loadFilteredProducts = useCallback(
    function () {
      if (isFetching) {
        return;
      }
      loadProducts({
        categories: selectedCategories,
        maxPrice: priceRange.maxPrice,
        query: searchQuery,
      });
    },
    [isFetching, loadProducts, selectedCategories, priceRange, searchQuery],
  );

  const toggleCategory = useCallback(
    function (value: CategoryItem["value"]) {
      const nextSelectedCategories = selectedCategories.includes(value)
        ? selectedCategories.filter((c) => c !== value)
        : [...selectedCategories, value];
      updateQueryParams({
        queryParams: { category: nextSelectedCategories.join(",") },
      });
      updateCategories(nextSelectedCategories);
      ensureMoreProducts({
        categories: nextSelectedCategories,
        maxPrice: priceRange.maxPrice,
        query: searchQuery,
      });
    },
    [
      selectedCategories,
      updateCategories,
      ensureMoreProducts,
      priceRange,
      searchQuery,
    ],
  );

  const categoryFilterOptions = useCategoryFilterOptions({ products });

  const productListItems = useMemo(() => {
    const filteredProducts = filterProducts({
      products,
      query: debouncedSearchQuery,
      priceRange,
      categories: selectedCategories,
      selectedRatings,
    });
    return sortProducts(filteredProducts, sortBy);
  }, [
    products,
    debouncedSearchQuery,
    priceRange,
    selectedCategories,
    selectedRatings,
    sortBy,
  ]);

  const handleProductClick = useCallback(
    function (slug: ProductCard["slug"], scrollY: number) {
      const filters: Partial<FilterMap> = {
        selectedCategories,
        sortBy,
        maxPrice: priceRange.maxPrice,
        selectedRatings,
        searchQuery,
      };
      storeNavigationState({ filters, scrollY });
      router.push(`/products/${slug}`);
    },
    [
      selectedCategories,
      sortBy,
      priceRange,
      selectedRatings,
      searchQuery,
      router,
    ],
  );

  function handleCartButtonClick(
    isVariantInCart: boolean,
    dispatch: ReturnType<typeof useAppDispatch>,
    product: ProductCard,
    selectedVariant: ProductCard["variants"][number],
  ) {
    const { productId } = product;
    if (isVariantInCart) {
      dispatch(removeProductFromCart({ productId }));
    }
    const cartItem = mapProductToCartItem(product, selectedVariant);
    dispatch(addToCart({ product: cartItem }));
  }

  if (isLoading) {
    return <ProductListingPageSkeleton />;
  }

  const activeFiltersCount = selectedCategories.length + selectedRatings.length;

  function isValidSortOption(value: string): value is SortOption {
    return sortOptions.includes(value as SortOption);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedSort = e.target.value;
    if (!isValidSortOption(selectedSort)) {
      return;
    }
    applySort(selectedSort);
  }

  return (
    <div className="bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
          <ProductListControlsProvider
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            toggleFiltersDrawer={toggleFiltersDrawer}
            activeFiltersCount={activeFiltersCount}
            sortBy={sortBy}
            handleSortChange={handleSortChange}
          >
            <Toolbar />
          </ProductListControlsProvider>
        </div>
      </header>

      <div className="@container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 @3xl:grid-cols-[1fr_3fr] gap-8">
          {/* Filters Sidebar */}

          <FiltersProvider
            activeFiltersCount={activeFiltersCount}
            clearAllFilters={clearAllFilters}
            categoryFilterOptions={categoryFilterOptions}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            priceRange={priceRange}
            updatePriceRange={updatePriceRange}
            selectedRatings={selectedRatings}
            updateSelectedRatings={updateSelectedRatings}
            isFiltersDrawerOpen={isFiltersDrawerOpen}
            closeFiltersDrawer={closeFiltersDrawer}
          >
            <FiltersLayout />
          </FiltersProvider>
          <div>
            <main className="grid @sm:grid-cols-2 gap-4 @2xl:grid-cols-3">
              {productListItems.map((product) => (
                <ProductCardItem
                  key={product.productId}
                  product={product}
                  sortBy={sortBy}
                  handleProductClick={handleProductClick}
                  handleCartButtonClick={handleCartButtonClick}
                  dispatch={dispatch}
                />
              ))}
            </main>
                   {!isError && productListItems.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-text-500 mb-4">
                    <Image
                      src={"/icons/search-xl.svg"}
                      alt=""
                      width={64}
                      height={64}
                      className="w-16 h-16 mx-auto"
                    />
                  </div>
                  <h3 className="text-h6 font-semibold text-text-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-body text-text-500 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={()=>{
                      clearAllFilters();
                      if(!products||products.length===0){
                        loadProducts({categories:[],maxPrice:MAX_PRICE,query:""});
                      }
                    }}
                    className="px-6 py-3 text-body bg-inverse text-white rounded-full font-medium hover:bg-gray-800 transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
              {(isRefreshing || isFetching) && (
                <>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </>
              )}
            {!isError && !isFetching && showLoadMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadFilteredProducts}
                  className="px-8 py-3 text-body bg-inverse text-white rounded-xl font-medium hover:bg-gray-800 transition inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Load More Products</span>
                  <Image
                    src={"/icons/chevron-down-white.svg"}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </button>
              </div>
            )}
            {isError && error && (
              <div className="min-h-screen">
                <div className="flex min-h-[60vh] items-center justify-center px-4">
                  <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                      <Image
                        src={"/icons/circle-x-lg.svg"}
                        alt=""
                        width={28}
                        height={28}
                        className="w-7 h-7"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Failed to load products
                    </h3>

                    <p className="text-sm text-gray-500 mb-6">
                      Something went wrong while fetching products. Please try
                      again.
                    </p>

                    <button
                      onClick={refetch}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 active:scale-[0.98] transition"
                    >
                      <span>Retry</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
