import { createContext, useContext } from "react";
import { usePurchaseQuantity } from "./hooks/usePurchaseQuantity";

export const ProductPurchaseContext=createContext<ReturnType<typeof usePurchaseQuantity>|null>(null);

export function useProductPurchase(){
    const context=useContext(ProductPurchaseContext);
    if(!context){
        throw new Error("useProductPurchase must be used only inside ProductPurchaseProvider");
    }
    return context;
}