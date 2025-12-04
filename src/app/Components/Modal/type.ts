import { theme } from "./Constants/theme";
import { AnimationVariants } from "./Constants/AnimationVariants";
import { ModalState } from "./Constants/ModalState";

export type ModalStatus = "open" | "closing" | "closed";

export type ModalStateType =
    | { status: typeof ModalState.OPEN; content: React.ReactNode, id: string, variant: keyof typeof theme, options: ModalOptions }
    | { status: typeof ModalState.CLOSING; content: React.ReactNode, id: string, variant: keyof typeof theme, options: ModalOptions }
    | { status: typeof ModalState.CLOSED };


export type ModalOptions = {
    animationVariant: keyof typeof AnimationVariants;
    duration: number
}