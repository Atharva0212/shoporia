import { ProductRecordData } from "@/src/lib/db/models/product.model";
import { MongooseObjectId } from "@/src/lib/db/types";
import { PaginatedResult } from "@/src/Types/types";

export type ProductCard = {
  productId: string;
  name: ProductRecordData["name"];
  variants: Pick<ProductRecordData["variants"][number],"price"|"originalPrice"|"isPrimary"|"sku">[];
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
