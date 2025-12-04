export type ReactStateDispatch<T>=React.Dispatch<React.SetStateAction<T>>;

export type ValueOf<T extends object> = T[keyof T];