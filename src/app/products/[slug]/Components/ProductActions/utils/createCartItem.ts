import { CartItem } from "@/src/app/features/cart/cartSlice";
import type { useVariantFilter } from "../../../context/variantFilter/VariantFilterContext";
import { ProductDetails } from "../../../types";

export function createCartItem({
    product,
    bestMatchImageVariant,
    selectedVariant,
}: {
    product: { productId: ProductDetails["id"], productName: ProductDetails["name"],slug:ProductDetails["slug"] },
    bestMatchImageVariant: ProductDetails["images"][number];
    selectedVariant: ReturnType<typeof useVariantFilter>["selectedVariant"];
}): CartItem {
    const {productName}=product;
    return {
        productId: product.productId,
        slug:product.slug,
        productName,
        image: {
            src: bestMatchImageVariant.url,
            alt: productName,
        },
        variantAttributes: selectedVariant.attributes,
        sku: selectedVariant.sku,
        price: selectedVariant.price,
        originalPrice: selectedVariant.originalPrice,
        quantity: 1,
        stock: selectedVariant.stock,
    };
}