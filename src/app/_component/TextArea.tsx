"use client";

import { cn } from "@/utils/cn";
import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  labelClassName?: string;
  textareaClassName?: string;
}

export default function TextArea({
  id,
  label,
  labelClassName = "",
  textareaClassName = "",
  ...props
}: TextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn("text-[15px] font-bold", labelClassName)}
      >
        {label}
      </label>
      <textarea
        id={id}
        className={cn(
          "h-[240px] bg-input py-4 px-[10px] rounded-lg text-gray font-bold focus:outline-none placeholder:text-gray placeholder:text-sm placeholder:font-bold resize-none overflow-auto scrollbar",
          textareaClassName
        )}
        {...props}
      />
    </div>
  );
}
