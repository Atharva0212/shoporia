import { CategoryItem } from "../../Constants/categories";
import { ProductRecordData } from "@/src/lib/db/models/product.model";
import { MongooseObjectId } from "@/src/lib/db/types";

export type ProductCard = {
  productId: string;
  slug:ProductRecordData["slug"];
  name: ProductRecordData["name"];
  variants: Pick<ProductRecordData["variants"][number],"price"|"originalPrice"|"sku"|"isPrimary"|"attributes"|"stock">[];
  minPrice: ProductRecordData["minPrice"];
  maxPrice: ProductRecordData["maxPrice"];
  image: ProductRecordData["images"][number]["url"];
  category: ProductRecordData["category"];
  brand: ProductRecordData["brand"];
  badge: ProductRecordData["badges"];
  averageRating: ProductRecordData["averageRating"];
  reviews: ProductRecordData["reviewCount"];
};

export type RawProductCard=Omit<ProductCard,"productId"|"variants"|"image"|"reviews">&{_id:MongooseObjectId,variants:ProductRecordData["variants"],images:ProductRecordData["images"],reviewCount:ProductRecordData["reviewCount"],updatedAt:Date};

export type CursorPagination = {
    hasMore: true, cursor: {
      updatedAt: number;
        id: string;
    }
} | { hasMore: false };

export type PaginatedProductCards = PaginatedResult<ProductCard,CursorPagination>;

export type PriceRange={ minPrice: number; maxPrice: number };

type DataSuccess<T> = { success: true; responseData: T };

export type GenericError = { success: false; error: "Internal server error."|string };

export type DataApiResponse<T> = | DataSuccess<T> | GenericError;

export type PaginatedResult<T extends object,K> = {
    paginationState: K;
    data: T[];
};

export type ProductListingState = {
  filterCache: { [cacheKey: string]: CursorPagination };
  products: ProductCard[];
};

export type ProductListingQueryParams={
  updatedAt?:number,
  id?:string,
  category?:string,
  maxPrice?:number,
  query?:string
}

export type CategoryFilterOption = { value: CategoryItem["value"]; label: CategoryItem["label"]; count: number };

export type SortOption = "price-low" | "price-high" | "top-rated";