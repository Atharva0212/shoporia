type DataSuccess<T> = { success: true; responseData: T };

type MessageSuccess = { success: true; message: string };

export type GenericError = { success: false; error: "Internal server error."|string };

type ValidationError<T extends string = string> = { success: false; validationError: Record<T, string> };

export type DataApiResponse<T> = | DataSuccess<T> | GenericError;

export type MessageApiResponse = | MessageSuccess | GenericError;

export type ExtendedMessageApiResponse = | MessageApiResponse | ValidationError;

