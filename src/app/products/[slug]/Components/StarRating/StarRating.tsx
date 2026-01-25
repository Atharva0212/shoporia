import "./star-rating.css";

type StarRatingProps = {
  rating: number;
};

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        let fillPercentage = 0;

        if (rating >= index + 1) {
          fillPercentage = 100;
        } else if (rating > index) {
          fillPercentage = (rating - index) * 100;
        }

        return (
          <div
            key={index}
            style={{
              background: `linear-gradient(to right, hsl(48, 97%, 55%) ${fillPercentage}%, hsl(0, 0%, 80%) ${fillPercentage}%,hsl(0, 0%, 80%))`,
            }}
            className="w-4 h-4 star"
          ></div>
        );
      })}
    </div>
  );
}

export function Star({ isFilled }: { isFilled: boolean }) {
  return (
    <div
      className={`w-4 h-4 star ${
        isFilled ? "bg-[hsl(48,97%,55%)]" : "bg-[hsl(0,0%,80%)]"
      }`}
    />
  );
}
