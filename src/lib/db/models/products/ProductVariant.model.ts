import { Attributes } from "@/src/Types/types";
import { Schema } from "mongoose";

export type VariantRecordData = {
  attributes: Attributes;
  price: number;
  originalPrice: number;
  discount?: number;
  stock: number;
  sku: string;
  isPrimary: boolean;
}

export const VariantSchema = new Schema<VariantRecordData>(
  {
    attributes: {
      type: Map,
      of: String,
      required: true
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number },
    stock: { type: Number, default: 0 },
    sku: { type: String, required: true, unique: true },
    isPrimary: { type: Boolean, default: false }
  },
  { _id: false }
);
