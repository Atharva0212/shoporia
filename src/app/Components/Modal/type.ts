import { AnimationVariants } from "./Constants/AnimationVariants";
import { ModalState } from "./Constants/ModalState";

export type ModalStatus = "open" | "closing" | "closed";

export type ModalStateType =
    | { status: typeof ModalState.OPEN; content: React.ReactNode, id: string, options: ModalOptions }
    | { status: typeof ModalState.CLOSING; content: React.ReactNode, id: string, options: ModalOptions }
    | { status: typeof ModalState.CLOSED };


export type ModalOptions = {
    animationVariant: keyof typeof AnimationVariants;
    closeBehavior:ModalCloseBehavior
}

type ModalCloseBehavior =| { manualClose: true; } | { manualClose: false; duration: number }