"use client";

import { AppPreloadedState } from "@/src/Types/redux";
import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";
import { useAppDispatch } from "../store/hooks";
import { rehydrateCart } from "../features/cart/cartSlice";
import { getPersistedCart } from "../products/[slug]/Components/ProductActions/utils/cartStorage";
import { initialFilterState } from "../products/ProductListing/features/productListFilters.slice";

type ReduxProviderProps = PropsWithChildren & {
  preloadedState: AppPreloadedState;
};

export function ReduxStoreProvider({
  preloadedState,
  children,
}: ReduxProviderProps) {
  const store = makeStore({ ...preloadedState, cart: { items: [] },productListFilters:initialFilterState});
  return (
    <Provider store={store}>
      <StateHydrator>{children}</StateHydrator>
    </Provider>
  );
}

function StateHydrator({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  useEffect(
    function () {
      dispatch(
        rehydrateCart({
          items: getPersistedCart()?.items ?? [],
        }),
      );
    },
    [dispatch],
  );
  return children;
}
