import { ToastHandle, ToastItem, ToastOptions, ToastVariant } from "@/src/app/Components/Toast/types";
import { getTimestamp } from "@/src/utils/getTimestamp";
import { useEffect, useRef, useState } from "react";
import { REMOVE_DELAY_MS, TOAST_DURATION_MS } from "../config";

export function useToastController() {
    const [toastList, setToastList] = useState<ToastItem[]>([]);

    const toastRefs = useRef<Record<ToastItem["id"], ToastHandle | null>>({});
    const closeTimersRef = useRef<
        Record<ToastItem["id"], ReturnType<typeof setTimeout>>
    >({});
    const removeTimersRef = useRef<Record<ToastItem["id"], ReturnType<typeof setTimeout>>>({});


    useEffect(() => {
        const closeTimeouts = closeTimersRef.current;
        const removeTimeouts = removeTimersRef.current;
        return () => {
            Object.values(closeTimeouts).forEach(clearTimeout);
            Object.values(removeTimeouts).forEach(clearTimeout);
        };
    }, []);

    function handleCloseToast(id: ToastItem["id"]) {
        clearTimeout(closeTimersRef.current[id]);
        delete closeTimersRef.current[id];
        setToastList((prev) =>
            prev.map((toast) => {
                if (toast.id === id) {
                    return {
                        ...toast,
                        isExisting: true,
                    };
                } else {
                    return toast;
                }
            })
        );
        const removeToastTimer = setTimeout(() => {
            setToastList((prev) => prev.filter((toast) => toast.id !== id));
            delete toastRefs.current[id];
        }, REMOVE_DELAY_MS);
        removeTimersRef.current[id] = removeToastTimer;
    }

    function handleMouseEnter(id: ToastItem["id"]) {
        const currentDate = getTimestamp();
        const toast = toastList.find((t) => t.id === id);
        const startTime = toast?.startTime ?? currentDate;
        const toastDuration = toast?.remainingTime ?? TOAST_DURATION_MS;
        const elapsedTime = currentDate - startTime;
        const remainingTime = toastDuration - elapsedTime;

        toastRefs.current[id]?.pause();
        clearTimeout(closeTimersRef.current[id]);
        delete closeTimersRef.current[id];

        setToastList((prev) =>
            prev.map((toast) => {
                if (toast.id === id) {
                    return {
                        ...toast,
                        remainingTime,
                    };
                } else {
                    return toast;
                }
            })
        );
    }

    function handleMouseLeave(id: ToastItem["id"]) {
        const remainingTime =
            toastList.find((t) => t.id === id)?.remainingTime ?? TOAST_DURATION_MS;
        setToastList((prev) =>
            prev.map((toast) => {
                if (toast.id === id) {
                    return {
                        ...toast,
                        startTime: getTimestamp(),
                        remainingTime,
                    };
                } else {
                    return toast;
                }
            })
        );
        const timer = setTimeout(() => {
            handleCloseToast(id);
        }, remainingTime);
        closeTimersRef.current[id] = timer;
        toastRefs.current[id]?.start();
    }

    function addToast(content: React.ReactNode, newToastTheme: ToastVariant, options: Partial<ToastOptions> = {}) {
        const currentDate = getTimestamp();
        const id = String(currentDate);
        const { animationVariant = "FADE", styles } = options;
        const mergedStyles = { ...styles }
        setToastList((prev) => [
            ...prev,
            {
                id,
                toastThemeKey: newToastTheme,
                startTime: currentDate,
                isExisting: false,
                remainingTime: TOAST_DURATION_MS,
                content,
                animationVariant,
                styles: mergedStyles
            },
        ]);
        const timer = setTimeout(() => {
            handleCloseToast(id);
        }, TOAST_DURATION_MS);
        closeTimersRef.current[id] = timer;
    }

    return { toastList, toastRefs, handleCloseToast, handleMouseEnter, handleMouseLeave, addToast };
}