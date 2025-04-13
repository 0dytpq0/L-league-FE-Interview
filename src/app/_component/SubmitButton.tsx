"use client";

import { ReactNode } from "react";
import Button from "./Button";

interface SubmitButtonProps {
  children: ReactNode;
  isPending?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
  pendingText?: string;
  size?: "sm" | "md" | "lg";
  isFullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

/**
 * 제출 버튼 컴포넌트 - 로딩 상태와 클릭 이벤트 처리
 */
export default function SubmitButton({
  children,
  isPending = false,
  onClick,
  isDisabled = false,
  pendingText,
  size = "md",
  isFullWidth = false,
  className,
  type = "button",
}: SubmitButtonProps) {
  // 로딩 중 텍스트가 제공되지 않은 경우 기본값 설정
  const loadingText = pendingText || `${children} 중...`;
  
  // 버튼 클릭 핸들러
  const handleClick = () => {
    if (!isPending && !isDisabled && onClick) {
      onClick();
    }
  };

  return (
    <Button
      type={type}
      onClick={handleClick}
      disabled={isPending || isDisabled}
      size={size}
      isFullWidth={isFullWidth}
      className={className}
    >
      {isPending ? loadingText : children}
    </Button>
  );
}
