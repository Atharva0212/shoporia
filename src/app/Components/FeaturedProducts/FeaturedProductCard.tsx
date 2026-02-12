import Image from "next/image";
import { FeaturedProductCardData } from "./type";

export function FeaturedProductCard({ productData,navigateToProduct }: { productData: FeaturedProductCardData,navigateToProduct:(slug:FeaturedProductCardData["slug"])=>void }) {
  const {slug,name,price,originalPrice,image}=productData;
  const discount = Math.round((1 - price / originalPrice) * 100);
  return (
    <div className="border-divider-400 rounded-xl group bg-background overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={288}
          className="w-full h-full object-fill rounded-t-xl aspect-square bg-skeleton"
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={()=>navigateToProduct(slug)} className="w-full py-2.5 bg-background text-inverse rounded-full font-semibold hover:bg-divider-100 transition flex items-center justify-center gap-2 shadow-lg">
            <Image
              src="/icons/eye.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
            View Product
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-h6 font-semibold text-text-900 mb-2">
          {productData.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-h5 font-bold text-text-900">
            ₹{price}
          </span>
          <span className="text-body text-text-500 line-through">
            ₹{originalPrice}
          </span>
        </div>

        <div className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-body-sm font-semibold">
          Save {discount}%
        </div>
      </div>
    </div>
  );
}
