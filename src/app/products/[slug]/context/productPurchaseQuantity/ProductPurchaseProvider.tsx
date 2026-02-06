import { PropsWithChildren } from "react";
import { ProductPurchaseContext } from "./ProductPurchaseContext";
import { usePurchaseQuantity } from "./hooks/usePurchaseQuantity";

export function ProductPurchaseProvider({ children }: PropsWithChildren) {
  const { quantity, decrementQuantity, incrementQuantity, resetQuantity } =
    usePurchaseQuantity();
  return (
    <ProductPurchaseContext.Provider
      value={{ quantity, decrementQuantity, incrementQuantity, resetQuantity }}
    >
      {children}
    </ProductPurchaseContext.Provider>
  );
}
