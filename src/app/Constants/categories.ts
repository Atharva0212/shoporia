export const categories = {
  "home-furniture": {
    name: "Home Furniture",
    image: "/icons/categories/home-furniture.svg",
  },
  fashion: {
    name: "Fashion",
    image: "/icons/categories/fashion-apparel.svg",
  },
  electronics: {
    name: "Electronics",
    image: "/icons/categories/electronics.svg",
  },
  "toys-and-hobbies": {
  name: "Toys and Hobbies",
  image: "icons/categories/toys-and-hobbies.svg",
},
  "home-appliances": {
    name: "Home Appliances",
    image: "/icons/categories/home-appliances.svg",
  },
  "sports-and-fitness": {
    name: "Sports",
    image: "/icons/categories/sports.svg",
  },
} as const;

export type Category=keyof typeof categories;
