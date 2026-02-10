import { GenericError } from "@/src/Types/response";

export type TempUserTokenPayload = { tempUserId: string };

type LoginResponse = { success: true, userState: { isLoggedIn: true, userId: string, userName?: string, avatarBg: string } };

export type LoginApiResponse = | LoginResponse | GenericError;