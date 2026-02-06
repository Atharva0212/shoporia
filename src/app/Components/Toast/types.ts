import { ValueOf } from "../../Types/types";
import { AnimationVariants } from "./Constants/AnimationVariants";
import { theme } from "./Constants/theme";
import { useToastController } from "./hooks/useToastController";

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

export type AddToast = ReturnType<typeof useToastController>["addToast"];