import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  isFullWidth?: boolean;
  className?: string;
}

/**
 * 기본 버튼 컴포넌트 - 스타일만 담당
 */
export default function Button({
  children,
  size = "md",
  isFullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // 기본 스타일
        "rounded-lg font-bold transition-all focus:outline-none bg-brand text-white hover:brightness-95 active:brightness-90 disabled:bg-[#B4B4B4] disabled:cursor-not-allowed",

        // 크기별 스타일
        {
          "py-2 px-3 text-sm": size === "sm",
          "py-3 px-4": size === "md",
          "py-4 px-6 text-lg": size === "lg",
        },

        // 너비 스타일
        isFullWidth && "w-full",

        // 사용자 정의 클래스
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
