import { createContext, useContext } from "react";
import { VerificationStatus } from "../../types";

type LoginContextType = {
  verificationStatus: VerificationStatus;
  updateStatus: (status: LoginContextType["verificationStatus"]) => void;
  email: string;
  handleEmailChange: (email: LoginContextType["email"]) => void;
};

export const LoginContext = createContext<LoginContextType | null>(null);

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context)
    throw new Error(
      "useLoginContext should be wrapped in LoginContextProvider"
    );
  return context;
}