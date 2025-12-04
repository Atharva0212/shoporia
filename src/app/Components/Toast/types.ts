import type { useToastController } from "./hooks/useToastController";
import { theme } from "./Constants/theme";
import { ValueOf } from "../../Types/types";
import { AnimationVariants } from "./Constants/AnimationVariants";

export type ToastVariant = keyof typeof theme;

export type ToastTheme = ValueOf<typeof theme>;

export type ToastHandle = {
    start: () => void;
    pause: () => void;
};

export type ToastItem = {
    id: string;
    toastThemeKey: ToastVariant;
    animationVariant: keyof typeof AnimationVariants
    startTime: number;
    remainingTime: number;
    isExisting: boolean;
    content: React.ReactNode;
    styles: React.CSSProperties;
};

export type ToastOptions = {
    styles: React.CSSProperties;
    animationVariant: keyof typeof AnimationVariants;
}