import Image from "next/image";
import { HomeCarouselSlide } from "../Types/HomeCarouselSlide.type";
import { Carousel } from "./Carousel/Carousel";
import { Button } from "./Button";
import { Layout } from "./Layout";

type HeroSectionProps={
  slideData:HomeCarouselSlide[],
}

export function HeroSection({slideData}:HeroSectionProps) {
  return (
    <Layout backgroundColor="background" className="mb-4">
    <div className="w-full aspect-10/6 max-w-5xl max-h-72 mx-auto">
      <Carousel>
        {slideData.map((slide, index) => {
          return <CarouselSlide key={index} slide={slide} index={index} />;
        })}
      </Carousel>
    </div>
    </Layout>
  );
}

function CarouselSlide({
  slide,
  index,
}: {
  slide: HomeCarouselSlide;
  index: number;
}) {
  const isSlideEven=index % 2 === 0;
  return (
    <div
      className={`w-full h-full flex ${
        isSlideEven ? "flex-row" : "flex-row-reverse"
      }`}
      style={{ backgroundColor: slide.bg }}
    >
      {/* Text Column */}
      <div className="flex-1 flex flex-col items-start justify-center">
          <h3 className="text-h4 font-bold mb-1 sm:mb-2">{slide.heading}</h3>
          <p className="text-body mb-2 sm:mb-4">{slide.description}</p>
          <Button className="bg-inverse text-text-100">
            {slide.ctaText}
          </Button>
      </div>

      {/* Image Column */}
      <div className="flex-1 flex items-center justify-center w-full h-full">
          <Image
            src={slide.image.url}
            alt={slide.image.alt}
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
      </div>
    </div>
  );
}
