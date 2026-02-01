import { PropsWithChildren } from "react";
import { ReduxStoreProvider } from "./ReduxStoreProvider";
import { cookies } from "next/headers";
import { AUTH_TOKEN_COOKIE } from "../api/auth/Constants/auth";
import { AppPreloadedState } from "@/src/Types/redux";
import { getConnectionModel } from "@/src/lib/db/connection";
import { verifyUserToken } from "@/src/utils/jwt";

export async function ReduxProvider({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;

  const userPreloadedState = await buildUserPreloadedState(token);
  
  return (
    <ReduxStoreProvider preloadedState={userPreloadedState}>
      {children}
    </ReduxStoreProvider>
  );
}

async function buildUserPreloadedState(
  token: string | undefined,
): Promise<{ user: AppPreloadedState["user"] }> {
  const defaultState = {
    user: {
      isLoggedIn: false,
    },
  };
  try {
    if (!token) {
      return defaultState;
    }
    const tokenResult = verifyUserToken(token);
    if (!tokenResult.success) {
      return defaultState;
    }
    const User = await getConnectionModel("User");
    const userRecord = await User.findById(tokenResult.userId);
    if (!userRecord) {
      return defaultState;
    }
    
    const { _id, name, avatarBg } = userRecord;
    
    return {
      user: {
        isLoggedIn: true,
        userId: _id.toString(),
        name,
        avatarBg,
      },
    };
  } catch {
    return defaultState;
  }
}
