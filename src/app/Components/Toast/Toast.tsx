import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  ANIMATION_EPSILON_MS,
  TOAST_ANIMATION_DURATION_MS,
  TOAST_DURATION_MS,
} from "./config";
import "./ToastNotification.css";
import type { ToastHandle, ToastItem } from "./types";
import Image from "next/image";
import { Button } from "../Button";
import { theme } from "./Constants/theme";
import { AnimationVariants } from "./Constants/AnimationVariants";

type ToastProps = {
  toast:ToastItem;
  handleClose: (id: ToastItem["id"]) => void;
  handleMouseEnter: (id: ToastItem["id"]) => void;
  handleMouseLeave: (id: ToastItem["id"]) => void;
};

export const Toast = forwardRef<ToastHandle, ToastProps>(function Toast(
  {
    toast,
    handleClose,
    handleMouseEnter,
    handleMouseLeave,
  },
  ref
) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<Animation | null>(null);

  useImperativeHandle(ref, () => ({
    start: () => {
      if (!animationRef.current) {
        animationRef.current = progressBarRef.current!.animate(
          [{ width: "100%" }, { width: "0%" }],
          {
            duration: TOAST_DURATION_MS + ANIMATION_EPSILON_MS,
            fill: "forwards",
          }
        );
      } else {
        animationRef.current?.play();
      }
    },
    pause: () => {
      animationRef.current?.pause();
    },
  }));
const {id,content,isExisting,toastThemeKey,animationVariant,styles}=toast;
const toastAnimation=AnimationVariants[animationVariant];
  const currentTheme = theme[toastThemeKey];
  return (
    <div
      role="alert"
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={() => handleMouseLeave(id)}
      className={`${toastAnimation.enter} max-w-sm w-[calc(100vw-2rem)] rounded-lg border ${
        isExisting ? toastAnimation.exit : ""
      }`}
      style={
        {
          "--toast-animation-duration": `${TOAST_ANIMATION_DURATION_MS}ms`,
          borderColor: currentTheme["borderColor"],
          ...styles,
        } as React.CSSProperties
      }
    >
        <div className="p-2 relative">
          <Button
            aria-label="Close toast"
            onClick={() => handleClose(id)}
            className="absolute top-2 right-2"
          >
            <Image src={"/close.svg"} alt="" className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-start pe-[5px] gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor:currentTheme.icon.bgColor}}>
            <Image
              width={20}
              height={20}
              className="w-5 h-5"
              src={currentTheme.icon.src}
              alt={currentTheme.icon.alt}
            />
          </div>
          <div className="flex-1">
            {content}
          </div>
        </div>
      <div className="h-1 bg-gray-200 rounded-lg">
        <div
          ref={progressBarRef}
          className={`h-full rounded-lg`}
          style={{
            backgroundColor: currentTheme["borderColor"],
          }}
        />
      </div>
    </div>
  );
});
