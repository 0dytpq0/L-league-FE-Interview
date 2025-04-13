"use client";

import ImageWrapper from "@/app/_component/ImageWrapper";
import { cn } from "@/lib/cn";
import { useState } from "react";

interface SelectBoxProps {
  id: string;
  label: string;
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
  required?: boolean;
  labelClassName?: string;
  selectBoxClassName?: string;
  optionBoxClassName?: string;
  optionClassName?: string;
}

export default function SelectBox({
  id,
  label,
  options,
  selectedOption,
  onChange,
  required = false,
  labelClassName = "",
  selectBoxClassName = "",
  optionBoxClassName = "",
  optionClassName = "",
}: SelectBoxProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category: string) => {
    onChange(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={cn(
          `text-black text-[15px] font-bold flex gap-[5px] ${labelClassName}`
        )}
      >
        {label}
        {required && (
          <div className="bg-brand w-[5px] h-[5px] rounded-full mt-1"></div>
        )}
      </label>
      <div className="relative">
        <section>
          <button
            type="button"
            id={id}
            onClick={toggleDropdown}
            className={cn(
              `w-full h-[60px] rounded-[10px] px-4 text-[15px] outline-none bg-input text-gray font-bold flex items-center justify-between ${selectBoxClassName}`
            )}
          >
            {selectedOption || "카테고리 선택"}
            <ImageWrapper
              src="/icon_downarrow.svg"
              alt="화살표"
              containerClassName={`w-6 h-6 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              objectFit="contain"
            />
          </button>
          {isDropdownOpen && (
            <ul
              className={cn(
                "absolute w-full mt-1 bg-input rounded-lg z-10 max-h-[200px] overflow-y-auto shadow-xl",
                optionBoxClassName
              )}
            >
              {options.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(option)}
                    className={cn(
                      `option-btn w-full text-left px-4 text-gray font-bold py-3 text-[15px] cursor-pointer hover:bg-white hover:brightness-90 ${optionClassName}`
                    )}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
