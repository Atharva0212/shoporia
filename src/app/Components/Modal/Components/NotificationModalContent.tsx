import Image from "next/image";
import { theme } from "../Constants/theme";

export function NotificationModalContent({
  variant,
  content,
}: {
  variant: keyof typeof theme;
  content: React.ReactNode;
}) {
  const variantTheme = theme[variant];
  return (
    <>
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full"
        style={{ backgroundColor: variantTheme.iconBg }}
      >
        <Image
          src={variantTheme.icon.src}
          alt={variantTheme.icon.alt}
          width={20}
          height={20}
          className={`w-8 h-8`}
        />
      </div>
      <div>{content}</div>
    </>
  );
}
