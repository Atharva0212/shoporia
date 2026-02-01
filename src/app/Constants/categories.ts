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

export const categoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home-appliances", label: "Home Appliances" },
  { value: "home-furniture", label: "Home Furniture" },
  { value: "sports-and-fitness", label: "Sports And Fitness" },
  { value: "toys-and-hobbies", label: "Toys And Hobbies" },
] as const;

export type CategoryItem=typeof categoryOptions[number];

export type Category=keyof typeof categories;
