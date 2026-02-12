"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "../Constants/categories";
import { FILTER_QUERY_PARAMS } from "../products/ProductListing/utils/filterQueryParams";
import { setListingNavTrigger } from "../products/ProductListing/utils/listingNavigationContext";

export function CategoryList() {
  const router=useRouter();
  const categoryKeys = Object.keys(categories) as Array<
    keyof typeof categories
  >;
  function navigateToCategoryListing(categoryKey:keyof typeof categories){
    setListingNavTrigger();
    router.push(`/products?${FILTER_QUERY_PARAMS.CATEGORY}=${categoryKey}`)
  }
  return (
    <div className="@container">
      <div className="grid gap-4 grid-cols-2 @min-xs:grid-cols-3 @min-xl:grid-cols-6">
        {categoryKeys.map(key => (
          <CategoryPill key={key} categoryKey={key} navigateToCategoryListing={navigateToCategoryListing}/>
        ))}
      </div>
    </div>
  );
}

type CategoryPillProps={
categoryKey: keyof typeof categories;
  navigateToCategoryListing:(categoryKey:keyof typeof categories)=>void;
}

function CategoryPill({
  categoryKey,
  navigateToCategoryListing,
}: CategoryPillProps) {
  const category = categories[categoryKey];

  return (
    <button
      className="bg-inverse flex flex-col items-center justify-center gap-2 rounded-2xl py-2 hover:scale-105 transition-transform duration-300 ease-in-out"
        onClick={()=>navigateToCategoryListing(categoryKey)}
    >
      <div className="w-6 h-6 @min-xl:w-8 @min-xl:h-8">
        <Image
          src={category["image"]}
          alt={category["name"]}
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </div>
      <p className="text-body  text-center text-text-100">{category["name"]}</p>
    </button>
  );
}
