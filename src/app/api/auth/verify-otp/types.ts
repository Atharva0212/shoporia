import { GenericError } from "@/src/Types/response";

type LoginResponse = { success: true, userState: { isLoggedIn: true, userId: string, userName?: string ,avatarBg:string}  };

export type LoginApiResponse = | LoginResponse | GenericError;