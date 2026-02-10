import { Category } from "@/src/app/Constants/categories";
import { SubCategory } from "@/src/app/Constants/subCategories";
import mongoose, { Schema } from "mongoose";
import { BaseDocument } from "../types";
import { ImageDocument, ImageSchema } from "./products/ProductImage.model";
import { ProductReviewRecordData, ReviewSchema } from "./products/ProductReview.model";
import { VariantRecordData, VariantSchema } from "./products/ProductVariant.model";

type RatingDistribution = Record<number, number>;

type RatingDistributionData = { distribution: RatingDistribution }

export type ProductRecordData = {
  name: string;
  slug: string;

  brand: string;
  category: Category;
  subCategory: SubCategory;
  tags: string[];

  variants: VariantRecordData[];

  discount: number,

  minPrice:number,
  maxPrice:number,

  images: ImageDocument[];
  thumbnail: string;

  reviews: ProductReviewRecordData[]
  rating: number;
  averageRating: number;
  ratingDistribution: RatingDistributionData,
  reviewCount: number;

  badges?: (| "Best Seller" | "New Arrival" | "Sale" | "Trending" | "Editor's Choice" | "Premium")[];

  soldCount: number;
  viewCount: number;

  metaTitle: string;
  metaDescription: string,
  metaKeywords: string[],
}

export type ProductDocument = BaseDocument<ProductRecordData>;

const ratingDistributionSchema = new Schema<RatingDistributionData>({
  distribution: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
}, { _id: false });

export const ProductSchema = new Schema(
  {
    // Basic info
    name: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, unique: true, lowercase: true, index: true },

    // Brand, category, tags
    brand: { type: String },
    category: { type: String },
    subCategory: { type: String },
    tags: [{ type: String, trim: true }],

    // Variants
    variants: [VariantSchema],

    discount: { type: Number, required: true },

    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },

    // Images
    images: [ImageSchema],
    thumbnail: { type: String },

    // Reviews & ratings
    reviews: [ReviewSchema],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    ratingDistribution: ratingDistributionSchema,
    reviewCount: { type: Number, default: 0 },

    // Badges
    badges: [{ type: String, enum: ["Best Seller", "New Arrival", "Limited Edition", "Trending", "Sale", "Premium Quality", "Official Store"] }],

    // Analytics
    soldCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },

    // SEO
    metaTitle: { type: String, maxlength: 60 },
    metaDescription: { type: String, maxlength: 160 },
    metaKeywords: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({
  name: 'text',
  brand: 'text',
});


export const productModelName = "Product"

export const Product = mongoose.models.Product ?? mongoose.model<ProductDocument>(productModelName, ProductSchema);