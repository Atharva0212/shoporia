import mongoose from "mongoose";
import { PendingUserDocument, pendingUserModelName, PendingUserSchema } from "./models/pendingUser.model";
import { ProductDocument, productModelName, ProductSchema } from "./models/product.model";
import { ReplyDocument, replyModelName, ReplySchema } from "./models/reply.model";
import { ReviewDocument, reviewModelName, ReviewSchema } from "./models/review.model";
import { UserDocument, userModelName, UserSchema } from "./models/user.model";

export type Store<T extends keyof DbModels,K extends mongoose.Schema> = {
    modelName: T
    schema: K
}

export type MongooseObjectId = mongoose.Types.ObjectId;

export type BaseDocument<T extends object> = T & mongoose.Document & { _id: MongooseObjectId, updatedAt: Date, createdAt: Date };

export type DbModels={
    [pendingUserModelName]:Store<typeof pendingUserModelName,typeof PendingUserSchema>&{document:PendingUserDocument},
    [userModelName]:Store<typeof userModelName,typeof UserSchema>&{document:UserDocument},
    [productModelName]:Store<typeof productModelName,typeof ProductSchema>&{document:ProductDocument},
    [reviewModelName]:Store<typeof reviewModelName,typeof ReviewSchema>&{document:ReviewDocument},
    [replyModelName]:Store<typeof replyModelName,typeof ReplySchema>&{document:ReplyDocument},
}