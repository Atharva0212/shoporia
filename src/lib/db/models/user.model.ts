import mongoose, { Schema } from "mongoose";
import { BaseDocument } from "../types";

export type UserRecordData = {
  email: string;
  name: string;
  avatar: {
    character: string;
    bg: string;
  };
}

export type UserDocument = BaseDocument<UserRecordData>;

export const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: {
            validator: (v: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v ?? ""),
            message: (props: { value: string }) => `${props.value ?? "Invalid"} is not a valid email address!`,
        }
    },
    name:{
        type:String,
        min:0,
        max:100,
        trim:true,
    },
     avatar: {
      initial: { type: String, required: true },
      bgColor: { type: String, required: true },
      url: { type: String }
    },
}, { timestamps: true });

export const userModelName = "User";

export const User = mongoose.models.User ?? mongoose.model<UserDocument>(userModelName,UserSchema);

