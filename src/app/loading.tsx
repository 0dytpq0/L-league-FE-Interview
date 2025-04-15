import { cn } from "@/utils/cn";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  containerClassName?: string;
}

export default function Loading({
  size = "md",
  text = "로딩 중...",
  containerClassName,
}: LoadingProps = {}) {
  const sizeMap = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 h-[206px]",
        containerClassName
      )}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-brand border-t-transparent",
          sizeMap[size]
        )}
        role="status"
        aria-label="로딩"
      />
      {text && <p className="text-gray-600 font-medium text-sm">{text}</p>}
    </div>
  );
}
