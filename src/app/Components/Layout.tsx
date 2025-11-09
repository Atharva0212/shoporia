import clsx from "clsx";

type LayoutProps = {
  children: React.ReactNode;
  backgroundColor?: "background"|"surface"|"inverse";
  className?: string;
};

export function Layout({ children, backgroundColor="surface",className }: LayoutProps) {
  return (
    <div className={clsx("max-w-7xl px-4 sm:px-0 mx-auto",`bg-${backgroundColor}`,className)}>
      {children}
    </div>
  );
}
