import axios from "axios";
import { AddToast } from "../app/Components/Toast/types";
import { CreateCheckoutSessionResponse } from "../app/api/payment/create-checkout-session/route";
import { getErrorMessage } from "./getErrorMessage";

export async function handleCheckout({
  productId,
  sku,
  quantity,
  pathName,
  addToast,
}: {
  productId: string;
  sku: string;
  quantity?: number;
  pathName:string;
  addToast: AddToast;
}) {
  try {
    const { data } = await axios.post<CreateCheckoutSessionResponse>("/api/payment/create-checkout-session", {
      productId,
      sku,
      pathName,
      quantity,
    });
    if (data.success) {
      window.location.href = data.responseData.checkoutUrl;
      return;
    }
  } catch (error) {
    const errorMessage = getErrorMessage(
      error,
      "Payment failed. Please try again.",
    );
    addToast(errorMessage, "error");
  }
}