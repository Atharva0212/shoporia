import mongoose from "mongoose";

export function toMongoObjectId(id:string){
    return new mongoose.Types.ObjectId(id);
}