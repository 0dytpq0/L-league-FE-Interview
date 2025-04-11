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
  containerClassName = "flex flex-col w-full gap-1",
  labelClassName = "text-[#CCCCCC] text-[15px] font-bold",
  inputClassName = "bg-input py-4 px-[10px] rounded-lg placeholder:text-[#C2C2C2] placeholder:text-sm",
  ...props
}: InputFieldProps) {
  return (
    <div className={cn(containerClassName)}>
      <label htmlFor={id} className={cn(labelClassName)}>
        {label}
      </label>
      <input id={id} className={cn(inputClassName)} {...props} />
    </div>
  );
}
