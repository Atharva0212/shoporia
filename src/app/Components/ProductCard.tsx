import Image from "next/image";
import { ProductCardData } from "../Types/ProductCard.type";

export function ProductCard({ productData }: { productData: ProductCardData }) {
  return (
    <div className="grid grid-rows-[1fr_auto] border border-divider-300 rounded-xl group bg-background overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative bg-gray-500 h-72">
        <Image
          src={productData.image}
          alt={productData.name}
          width={400}
          height={288}
          className="w-full h-full object-fill rounded-t-xl"
        />

        {/* Add to Cart - Shows on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full py-2.5 bg-background text-inverse rounded-full font-semibold hover:bg-divider-100 transition flex items-center justify-center gap-2 shadow-lg">
            <Image
              src="/icons/shopping-cart.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-h6 font-semibold text-text-900 mb-2">
          {productData.name}
        </h3>
        <p className="text-body text-text-500 mb-3">
          {productData.description}
        </p>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3 text-nowrap">
          <div
            className="flex items-center gap-1"
            aria-label={`Rating: ${productData.rating} out of 5 stars`}
          >
            <Image
              src="/icons/star.svg"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="text-body font-medium text-text-700">4</span>
          </div>
          <span className="text-text-300">•</span>
          <span className="text-body text-text-500">
            ({productData.reviews} reviews)
          </span>
        </div>
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-h5 font-bold text-text-900">
            ₹{(productData.originalPrice-(productData.originalPrice*(productData.discountPercent/100))).toLocaleString()}
          </span>
          <span className="text-body text-text-500 line-through">
            ₹{productData.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Save Badge */}
        <div className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
          {/* Save {calculateDiscount(product.price, product.originalPrice)}% */}
          Save {productData.discountPercent}%
        </div>
      </div>
    </div>
  );
}
