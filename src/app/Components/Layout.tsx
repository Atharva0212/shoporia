import { twMerge } from "tailwind-merge";

type LayoutProps = {
  children: React.ReactNode;
  backgroundColor?: "background" | "surface" | "inverse";
  className?: string;
  isMain?:boolean;
};

export function Layout({
  children,
  backgroundColor = "surface",
  className,
  isMain=false,
}: LayoutProps) {
  const Tag = isMain ? "main" : "section";
  return (
    <Tag className={`bg-${backgroundColor}`}>
      <div
        className={twMerge(
          "max-w-7xl p-4 mx-auto",
          `bg-${backgroundColor}`,
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
