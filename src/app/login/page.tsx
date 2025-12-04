"use client";

import { Layout } from "../Components/Layout";
import { Divider } from "./Component/Divider";
import { EmailInputStep } from "./Component/EmailInputStep";
import { LoginHeader } from "./Component/LoginHeader";
import { OTPEntryStep } from "./Component/OTPInputStep";
import { useLoginContext } from "./Context/LoginContext/LoginContext";
import { LoginContextProvider } from "./Context/LoginContext/LoginContextProvider";

export default function Page() {
  return (
    <Layout
      isMain={true}
      backgroundColor="surface"
      className="max-w-4xl flex items-center flex-col justify-center min-h-screen"
    >
      <LoginContextProvider>
        <LoginFormSection />
      </LoginContextProvider>
    </Layout>
  );
}

function Form() {
  const { verificationStatus } = useLoginContext();
  return (
    <>
      {verificationStatus === "pending" ? (
        <EmailInputStep />
      ) : verificationStatus === "otpSent" ? (
        <OTPEntryStep />
      ) : null}
    </>
  );
}

function LoginFormSection() {
  const { verificationStatus } = useLoginContext();
  return (
    <>
      <LoginHeader />
      <Form />
      {verificationStatus === "pending" && <Divider />}
    </>
  );
}
