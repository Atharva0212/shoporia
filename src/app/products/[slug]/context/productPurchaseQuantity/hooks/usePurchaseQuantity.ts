import { useCallback, useState } from "react";

export function usePurchaseQuantity() {
    const [quantity, setQuantity] = useState(1);
    const decrementQuantity = useCallback(function () {
        setQuantity((prev) => Math.max(1, prev - 1));
    }, []);
    const incrementQuantity = useCallback(function (stock: number) {
        setQuantity((prev) => Math.min(stock, prev + 1));
    }, []);
    return { quantity, decrementQuantity, incrementQuantity }
}