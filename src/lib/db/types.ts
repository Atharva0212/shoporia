import { MongooseObjectId } from "@/src/Types/mongoose";
import mongoose from "mongoose";
import { PendingUserDocument, pendingUserModelName, PendingUserSchema } from "./models/pendingUser.model";
import { UserDocument, userModelName, UserSchema } from "./models/user.model";

export type BaseDocument<T extends object> = T & mongoose.Document & { _id: MongooseObjectId, updatedAt: Date, createdAt: Date };

export type Store<T extends keyof DbModels,K extends mongoose.Schema> = {
    modelName: T
    schema: K
}

export type DbModels={
    [pendingUserModelName]:Store<typeof pendingUserModelName,typeof PendingUserSchema>&{document:PendingUserDocument},
    [userModelName]:Store<typeof userModelName,typeof UserSchema>&{document:UserDocument},
}