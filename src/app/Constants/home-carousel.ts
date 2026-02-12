import { FILTER_QUERY_PARAMS } from "../products/ProductListing/utils/filterQueryParams";
import type { HomeCarouselSlide } from "../Types/HomeCarouselSlide.type";
import { categories } from "./categories";

export const homeCarouselSlides: HomeCarouselSlide[] = [
  {
    bg: "#ffffff",
    image: {
      url: "/images/carousel/home-page-carousel/furniture.jpg",
      alt: "carousel-image-furniture",
    },
    heading: "Style Meets Comfort",
    description: "Find versatile pieces that fit your lifestyle and make every corner of your home shine.",
    ctaText: "Explore Now",
    destination:`/products?${FILTER_QUERY_PARAMS.CATEGORY}=home-furniture`,
  },
  {
    bg: "#ffffff",
    image: {
      url: "/images/carousel/home-page-carousel/apparels.jpg",
      alt: "carousel-image-apparels",
    },
    heading: "Style That Speaks",
    description: "Discover fashion that fits your lifestyle and expresses your personality.",
    ctaText: "Shop Now",
    destination:`/products?${FILTER_QUERY_PARAMS.CATEGORY}=fashion`,
  },
  {
    bg: "#ffffff",
    image: {
      url: "/images/carousel/home-page-carousel/electronics.jpg",
      alt: "carousel-image-electronics",
    },
    heading: "Tech That Empowers",
    description: "Explore cutting-edge gadgets and electronics to simplify your life.",
    ctaText: "Explore Now",
    destination:`/products?${FILTER_QUERY_PARAMS.CATEGORY}=electronics`,
  },
] as const;
