import { ProductCardData } from "../Types/ProductCard.type";
import { Layout } from "./Layout";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProducts() {
  return <Layout backgroundColor="surface"><FeaturedProductsHeading/>
  <FeaturedProductsList/>
  </Layout>;
}

function FeaturedProductsHeading() {
  return (
    <SectionHeading>
      <SectionHeading.Title textAlign="left">
        Featured Products
      </SectionHeading.Title>
      <SectionHeading.SubTitle textAlign="left">
        Discover our handpicked selection
      </SectionHeading.SubTitle>
    </SectionHeading>
  );
}

function FeaturedProductsList(){
    const products: ProductCardData[] = [
    {
      id: 1,
      name: "Premium Cotton White T-Shirt",
      description: "Soft breathable fabric with modern fit",
      discountPercent: 29,
      originalPrice: 599,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 2,
      name: "Classic Denim Jacket Vintage",
      description: "Timeless design with distressed finish",
      discountPercent: 9,
      originalPrice: 1899,
      image:
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 167,
    },
    {
      id: 3,
      name: "Sports Running Shoes Black",
      description: "Advanced cushioning technology",
      discountPercent: 49,
      originalPrice: 3499,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 456,
    },
    {
      id: 4,
      name: "Leather Messenger Bag",
      description: "Genuine leather with adjustable strap",
      discountPercent: 40,
      originalPrice: 2799,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 189,
    },
    {
      id: 5,
      name: "Minimalist Leather Sneakers",
      description: "Sleek design with premium Italian leather",
      discountPercent: 39,
      originalPrice: 4599,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 321,
    },
    {
      id: 6,
      name: "Urban Backpack Travel Edition",
      description: "Multiple compartments with USB port",
      discountPercent: 10,
      originalPrice: 2299,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 287,
    },
  ];
    return (
    <div className="@container">
      <div className="grid grid-cols-1 @min-sm:grid-cols-2 @min-lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>
    </div>
  );
}
