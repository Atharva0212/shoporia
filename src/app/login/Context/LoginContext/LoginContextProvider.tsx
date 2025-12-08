import { PropsWithChildren, useState } from "react";
import { VerificationStatus } from "../../types";
import { LoginContext } from "./LoginContext";

export function LoginContextProvider({ children }: PropsWithChildren) {
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("pending");
  const [email, setEmail] = useState("");

  function handleEmailChange(value: string) {
    setEmail(value);
  }

  function updateStatus(status: VerificationStatus) {
    setVerificationStatus(status);
  }
  return (
    <LoginContext.Provider
      value={{ verificationStatus, updateStatus, email, handleEmailChange }}
    >
      {children}
    </LoginContext.Provider>
  );
}