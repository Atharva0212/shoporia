import { UserRecordData } from "@/src/lib/db/models/user.model";
import { GenericError } from "@/src/Types/response";

export type UserAvatar = { avatar: UserRecordData["avatar"] }

type LoginResponse = { success: true, userState: { isLoggedIn: true, userName?: string } & UserAvatar };

export type LoginApiResponse = | LoginResponse | GenericError;