"use client";

import { cn } from "@/utils/cn";
import ImageWrapper from "./ImageWrapper";
import { useState } from "react";

interface CheckboxProps {
  id?: string;
  label: string;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  labelClassName?: string;
  initialChecked?: boolean;
}

export default function Checkbox({
  id,
  label,
  required = false,
  onChange,
  className = "",
  labelClassName = "",
  initialChecked = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange?.(newCheckedState);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "w-5 h-5 rounded flex items-center justify-center cursor-pointer",
          isChecked ? "bg-white border border-brand" : "bg-gray"
        )}
        onClick={handleChange}
      >
        <ImageWrapper
          src={isChecked ? "/icon_check.svg" : "/icon_check_white.svg"}
          alt="체크"
          containerClassName="w-4 h-4"
          objectFit="contain"
        />
      </div>
      <label
        htmlFor={id}
        className={cn("text-[15px] cursor-pointer", labelClassName)}
        onClick={handleChange}
      >
        {label} {required && <span className="text-brand ml-1">(필수)</span>}
      </label>
    </div>
  );
}
