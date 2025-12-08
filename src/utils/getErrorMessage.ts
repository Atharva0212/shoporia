import { AxiosError } from "axios";
import { GenericError } from "../Types/response";

export function getErrorMessage(
  error: unknown,
  fallbackMessage = "An unexpected error occurred"
): string {
  if (!error) return fallbackMessage;

  let errorMessage = fallbackMessage;

  if (error instanceof AxiosError) {
    const data = error.response?.data as GenericError | undefined;

    if (!data) {
      // No response received (network error)
      return error.request && !error.response
        ? "Network Error: No response received"
        : fallbackMessage;
    } else if (data.error) {
      errorMessage = data.error;
    }
  }

  return errorMessage;
}