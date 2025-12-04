"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Carousel.css";
import { setting } from "./carousel.config";
import Image from "next/image";

export function Carousel({ children }: { children: React.ReactNode }) {
  const intervalRef = useRef<ReturnType<typeof setTimeout> | number>(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"right" | "left">(
    "right"
  );

  const carouselItems = useMemo(
    () => React.Children.toArray(children),
    [children]
  );
  const startSlider = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
      setSlideDirection(setting.defaultSlidingDirection);
    }, setting.slideDuration);
  }, [carouselItems]);

  useEffect(() => {
    startSlider();
    return () => clearInterval(intervalRef.current);
  }, [startSlider]);

  const handleDecrement = () => {
    const carouselItems = React.Children.toArray(children);
    clearInterval(intervalRef.current);
    setSlideDirection("left");
    setCarouselIndex((prev) => {
      return (prev - 1 + carouselItems.length) % carouselItems.length;
    });
    startSlider();
  };
  const handleIncrement = () => {
    const carouselItems = React.Children.toArray(children);
    clearInterval(intervalRef.current);
    setSlideDirection("right");
    setCarouselIndex((prev) => {
      return (prev + 1) % carouselItems.length;
    });
    startSlider();
  };

  const handleSlideSelect = (index: number) => {
    if (carouselIndex === index) return;
    clearInterval(intervalRef.current);
    if (carouselIndex < index) {
      setSlideDirection("right");
    } else {
      setSlideDirection("left");
    }
    setCarouselIndex(index);
    startSlider();
  };

  const CarouselElement = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const isActive = carouselIndex === index;
      return (
        <div
          className={`w-full h-full shrink-0 grow-0 ${
            carouselIndex === index
              ? slideDirection === "right"
                ? "right-show"
                : "left-show"
              : "hide"
          }`}
          aria-hidden={!isActive} // hide non-visible slides
          id={`carouselImage-${index}`}
        >
          {React.cloneElement(child)}
        </div>
      );
    }
  });

  return (
    <>
      <div className="h-full w-full overflow-hidden relative flex items-center justify-between mx-auto gap-2">
        <button
          aria-label="Previous slide"
          aria-controls={`carouselImage-${carouselIndex}`}
          className="carousel-button"
          onClick={handleDecrement}
          onFocus={handleDecrement}
        >
          <Image
            src="/icons/arrow.svg"
            alt=""
            width={24}
            height={24}
            className="rotate-180 h-4 md:h-6 max-w-6"
          />
        </button>
        <section
          className="flex-1"
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={() => startSlider()}
          aria-label="Carousel Image"
        >
          {CarouselElement}
        </section>
        <span aria-live="polite" aria-atomic="true" className="sr-only">
          {`Slide ${carouselIndex + 1} of ${carouselItems.length}`}
        </span>
        <button
          aria-label="Next slide"
          aria-controls={`carouselImage-${carouselIndex}`}
          className="carousel-button"
          onClick={handleIncrement}
          onFocus={handleIncrement}
        >
          <Image
            src="/icons/arrow.svg"
            alt=""
            width={24}
            height={24}
            className="h-4 md:h-6 max-w-6"
          />
        </button>
      </div>
      <ul className="flex items-center justify-center gap-2 mt-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideSelect(index)}
            className={`h-2 w-2 aspect-auto rounded-full cursor-pointer ${
              carouselIndex === index ? "stepper-active" : "stepper-inactive"
            }`}
          ></button>
        ))}
      </ul>
    </>
  );
}