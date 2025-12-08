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
}as const;