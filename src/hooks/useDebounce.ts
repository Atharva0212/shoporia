import { useEffect, useRef } from "react";

export function useDebounce<T extends (...agrs: Parameters<T>) => ReturnType<T>>(fn: T, delay: number = 300) {
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return function (...agrs: Parameters<T>) {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            fn(...agrs);
        }, delay);
    }
}