import { CategorySection } from "./Components/CategorySection";
import { FeaturedProducts } from "./Components/FeaturedProducts";
import { HeroSection } from "./Components/HeroSection";
import { Navbar } from "./Components/Navbar";
import { homeCarouselSlides } from "./Constants/home-carousel";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
          <HeroSection slideData={homeCarouselSlides}/>
          <CategorySection />
          <FeaturedProducts/>
      </main>
    </>
  );
}
