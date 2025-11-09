import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function Button({ children, className }: ButtonProps) {
  return <button className={clsx("py-2 px-4",className)}>{children}</button>;
}
