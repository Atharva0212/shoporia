import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={twMerge("py-2 px-4 text-body", className)} {...props}>
      {children}
    </button>
  );
}
