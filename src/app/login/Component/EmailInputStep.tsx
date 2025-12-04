import Image from "next/image";
import Input from "../../Components/Input";
import { useLoginContext } from "../Context/LoginContext/LoginContext";
import { Button } from "../../Components/Button";
import { useState } from "react";

export function EmailInputStep() {
  const { email, handleEmailChange } = useLoginContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const EmailIcon = (
    <Image
      src={"/icons/mail.svg"}
      alt=""
      width={20}
      height={20}
      className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
    />
  );
  function validateEmail(inputEmail: string) {
    const validateEmail = /\S+@\S+\.\S+/.test(inputEmail);
    if (!validateEmail) {
      setEmailError("Please enter an valid email");
      return false;
    }
    return true;
  }
  function handleEmailSubmit() {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;
    try {
      setIsSubmitting(true);
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <form onSubmit={handleEmailSubmit}>
      <Input
        label="Email"
        inputId="email"
        name="email"
        placeholder="Enter Email To Continue"
        elementNode={EmailIcon}
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        error={emailError}
      />
      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-inverse text-text-100 flex items-center justify-center gap-2 mt-4 rounded-xl py-3"
      >
        <span>
          {isSubmitting
            ? "Sending OTP"
            : !isSubmitting
            ? "Continue with Email"
            : null}
        </span>
        <Image
          src={"/icons/arrow-right.svg"}
          alt=""
          width={20}
          height={20}
          className="w-5 h-5"
        />
      </Button>
    </form>
  );
}
