import { DbModels } from "./types";

export const ModelStore: Record<keyof DbModels, () => Promise<{ modelName: DbModels[keyof DbModels]["modelName"], schema: DbModels[keyof DbModels]["schema"] }>> = {
    "PendingUser": async () => {
        const { pendingUserModelName: modelName, PendingUserSchema: schema } = await import("./models/pendingUser.model");
        return { modelName, schema }
    },
    "User": async () => {
        const { userModelName: modelName, UserSchema: schema } = await import("./models/user.model");
        return { modelName, schema }
    },
    "Product": async () => {
        const { productModelName: modelName, ProductSchema: schema } = await import("./models/product.model");
        return { modelName, schema }
    },
    "Review": async () => {
        const { reviewModelName: modelName, ReviewSchema: schema } = await import("./models/review.model");
        return { modelName, schema }
    },
    "Reply": async () => {
        const { replyModelName: modelName, ReplySchema: schema } = await import("./models/reply.model");
        return { modelName, schema }
    },
}as const;