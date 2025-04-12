"use client";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import ImageWrapper from "./ImageWrapper";

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function BackButton({ className, onClick }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer",
        className
      )}
      aria-label="뒤로 가기"
    >
      <ImageWrapper
        src={"/icon_prev.svg"}
        alt="prev"
        containerClassName="w-7 h-8 relative aspect-auto"
        objectFit="cover"
      />
    </button>
  );
}
