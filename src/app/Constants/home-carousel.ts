import type { HomeCarouselSlide } from "../Types/HomeCarouselSlide.type";

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
  },
  {
    bg: "#ffffff",
    image: {
      url: "/images/carousel/home-page-carousel/electronics.jpg",
      alt: "carousel-image-electronics",
    },
    heading: "Tech That Empowers",
    description: "Explore cutting-edge gadgets and electronics to simplify your life.",
    ctaText: "Browse Devices",
  },
] as const;
