import { cn } from "@/utils/cn";
import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export default function Input({
  id,
  label,
  containerClassName,
  labelClassName,
  inputClassName,
  ...props
}: InputFieldProps) {
  return (
    <div className={cn("flex flex-col w-full gap-2", containerClassName)}>
      <label
        htmlFor={id}
        className={cn("text-[#CCCCCC] text-[15px] font-bold", labelClassName)}
      >
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "bg-input py-4 px-[10px] rounded-lg placeholder:text-[#C2C2C2] placeholder:text-sm",
          inputClassName
        )}
        {...props}
      />
    </div>
  );
}
