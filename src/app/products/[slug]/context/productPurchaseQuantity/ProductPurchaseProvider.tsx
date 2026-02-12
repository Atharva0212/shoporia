import { PropsWithChildren } from "react";
import { ProductPurchaseContext } from "./ProductPurchaseContext";
import { usePurchaseQuantity } from "./hooks/usePurchaseQuantity";

export function ProductPurchaseProvider({ children }: PropsWithChildren) {
  const { quantity, decrementQuantity, incrementQuantity } =
    usePurchaseQuantity();
  return (
    <ProductPurchaseContext.Provider
      value={{ quantity, decrementQuantity, incrementQuantity }}
    >
      {children}
    </ProductPurchaseContext.Provider>
  );
}
