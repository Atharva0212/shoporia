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
  } else if (isGenericError(error)) {

    const { error:errorInfo,success } = error.data
    if (!success) {
      return errorInfo
    }
  }

  return errorMessage;
}
function isGenericError(error: unknown): error is {status:number,data:GenericError} {
  if (!error || typeof error !== "object") return false;

  const e = error as Record<string, unknown>;

  return (
    "status" in e &&
    "data" in e &&
    e.data !== null &&
    typeof e.data === "object" &&
    "success" in e.data &&
    "error" in e.data
  );
}
