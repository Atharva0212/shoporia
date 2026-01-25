"use client";

import { Provider } from "react-redux";
import { makeStore } from "../store/store";
import { initialUserState } from "../features/user/userSlice";
import { initialCartState } from "../features/cart/cartSlice";
import { PropsWithChildren } from "react";

export function ReduxProvider({ children }: PropsWithChildren) {
  const store = makeStore({ user: initialUserState, cart: initialCartState });
  return <Provider store={store}>{children}</Provider>;
}
