import { GenericError } from "@/src/Types/response";

type RedirectResponse = { success:true,redirect: "/" };

export type RedirectApiResponse = | RedirectResponse | GenericError;