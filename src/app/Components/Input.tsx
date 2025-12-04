import { twMerge } from "tailwind-merge";

import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputId: string;
  label: string;
  name: string;
  elementNode?: ReactNode;
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  labelClasses?: string;
  inputClasses?: string;
  placeholder: string;
  error?: string;
};

export function Input({
  inputId,
  label,
  name,
  elementNode,
  inputType = "text",
  labelClasses,
  inputClasses,
  placeholder,
  error,
  ...props
}: InputProps) {
  return (
    <>
      <label
        className={twMerge(
          "block text-body font-semibold text-text-500 mb-2",
          labelClasses
        )}
        htmlFor={inputId}
      >
        {label}
      </label>
      <div className={elementNode ? "relative" : ""}>
        <input
          id={inputId}
          name={name}
          type={inputType}
          placeholder={placeholder}
          className={twMerge(
            `w-full pl-12 pr-4 py-2.5 border-2 border-divider-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition`,
            inputClasses
          )}
          {...props}
        />
        {elementNode}
      </div>
      {error && (
          <p className="text-body text-red-600 mt-1">{error}</p>
      )} 
    </>
  );
}

export default Input;
