import { cn } from "@/utils/cn";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { id, label, containerClassName, labelClassName, inputClassName, ...props },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col w-full gap-2", containerClassName)}>
        <label
          htmlFor={id}
          className={cn(
            "text-[#CCCCCC] text-[15px] font-bold flex gap-[5px]",
            labelClassName
          )}
        >
          {label}
          {props.required && (
            <div className="bg-brand w-[5px] h-[5px] rounded-full mt-1"></div>
          )}
        </label>
        <input
          id={id}
          className={cn(
            "bg-input py-4 px-[10px] rounded-lg text-gray font-bold focus:outline-none placeholder:text-gray placeholder:text-sm placeholder:font-bold",
            inputClassName
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
