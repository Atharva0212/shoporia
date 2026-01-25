"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductDetails } from "../../types";
import type { VariantImage } from "./types";

type ImageGalleryProps = {
  productName:ProductDetails["name"];
  productImages: ProductDetails["images"];
};

export function ImageGallery({ productName,productImages }: ImageGalleryProps) {;
  const [activeImage, setActiveImage] = useState<VariantImage>(() =>productImages.find(image=>image.isPrimary)??productImages[0]);

  function selectImage(id: VariantImage["id"]) {
    if (activeImage.id === id) return;
    setActiveImage(
      (prev) => productImages.find((image) => image.id === id) ?? prev
    );
  }

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-2xl mb-4">
        <Image
          src={activeImage["url"]}
          className="w-full min-h-full object-cover rounded-2xl"
          alt={productName}
          width={450} height={450}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {productImages.map((image) => {
          const { id, url } = image;
          return (
            <div
              key={id}
              onClick={() => selectImage(id)}
              className={`flex-1 aspect-square overflow-hidden rounded-xl ${
                id === activeImage.id ? "outline-1 outline-black" : ""
              }`}
            >
              <Image className="w-full h-full object-cover" src={url} alt={productName} width={200} height={200}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}


