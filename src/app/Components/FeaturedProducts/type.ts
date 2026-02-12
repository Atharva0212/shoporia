import { ProductRecordData } from "@/src/lib/db/models/product.model";

export type FeaturedProductCardData = {
  slug: ProductRecordData["slug"],
  name: ProductRecordData["name"],
  price: ProductRecordData["variants"][number]["price"],
  originalPrice: ProductRecordData["variants"][number]["originalPrice"],
  image: ProductRecordData["images"][number]["url"],
};