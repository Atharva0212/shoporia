import Image from "next/image";
import { useLoginContext } from "../Context/LoginContext/LoginContext";

export function LoginHeader() {
  const { verificationStatus, email } = useLoginContext();
  return (
    <>
      <div className="flex items-center justify-center w-16 h-16 bg-inverse rounded-2xl mb-4 mx-auto">
        <Image
          src={"/icons/shopping-bag.svg"}
          alt=""
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </div>
      <h1 className="text-h4 font-bold text-center mb-2">
        {verificationStatus === "pending"
          ? "Welcome"
          : verificationStatus === "otpSent"
          ? "Verify Your Email"
          : null}
      </h1>
      <p className="text-body text-text-500 mb-4">
        {verificationStatus === "pending"
          ? "Sign in to access your account and continue shopping"
          : verificationStatus === "otpSent" && email
          ? `We've sent a verification code to ${email}`
          : null}
      </p>
    </>
  );
}