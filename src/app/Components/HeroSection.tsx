import Image from "next/image";
import { HomeCarouselSlide } from "../Types/HomeCarouselSlide.type";
import { Carousel } from "./Carousel/Carousel";
import { Button } from "./Button";
import { Layout } from "./Layout";
import Link from "next/link";

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
  const {bg,heading,description,destination,ctaText,image}=slide;
  return (
    <div
      className={`w-full h-full flex ${
        isSlideEven ? "flex-row" : "flex-row-reverse"
      }`}
      style={{ backgroundColor: bg }}
    >
      {/* Text Column */}
      <div className="flex-1 flex flex-col items-start justify-center">
          <h3 className="text-h4 font-bold mb-2">{heading}</h3>
          <p className="hidden sm:block text-body mb-2 sm:mb-4">{description}</p>
          <Link href={destination} className="py-2 px-4 text-body bg-inverse text-text-100">
            {ctaText}
          </Link>
      </div>

      {/* Image Column */}
      <div className="flex-1 flex items-center justify-center w-full h-full">
          <Image
            src={image.url}
            alt={image.alt}
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
      </div>
    </div>
  );
}
