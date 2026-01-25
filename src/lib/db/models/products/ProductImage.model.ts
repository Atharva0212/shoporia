import { Schema } from "mongoose";
import { BaseDocument } from "../../types";

export type ImageRecordData = {
    url: string,
    isPrimary: boolean,
}

export type ImageDocument=BaseDocument<ImageRecordData>;

export const ImageSchema = new Schema<ImageRecordData>(
  {
    url: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
);
