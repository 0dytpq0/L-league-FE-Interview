"use client";

import { cn } from "@/utils/cn";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  labelClassName?: string;
  textareaClassName?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { id, label, labelClassName = "", textareaClassName = "", ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className={cn("text-[15px] font-bold flex gap-[5px]", labelClassName)}
        >
          {label}
          {props.required && (
            <div className="bg-brand w-[5px] h-[5px] rounded-full mt-1"></div>
          )}
        </label>
        <textarea
          id={id}
          className={cn(
            "h-[240px] bg-input py-4 px-[10px] rounded-lg text-gray font-bold focus:outline-none placeholder:text-gray placeholder:text-sm placeholder:font-bold resize-none overflow-auto scrollbar",
            textareaClassName
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
