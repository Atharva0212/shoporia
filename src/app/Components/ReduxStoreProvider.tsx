"use client";

import { AppPreloadedState } from "@/src/Types/redux";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { initialCartState } from "../features/cart/cartSlice";
import { makeStore } from "../store/store";

type ReduxProviderProps = PropsWithChildren & {
  preloadedState: AppPreloadedState;
};

export function ReduxStoreProvider({
  preloadedState,
  children,
}: ReduxProviderProps) {
  const store = makeStore({ ...preloadedState, cart: initialCartState });
  return <Provider store={store}>{children}</Provider>;
}
