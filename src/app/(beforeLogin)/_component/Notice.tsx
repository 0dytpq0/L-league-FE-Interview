import ImageWrapper from "@/app/_component/ImageWrapper";
import { cn } from "@/utils/cn";

interface NoticeProps {
  icon?: string;
  iconAlt?: string;
  label?: string;
  message: string;
  containerClassName?: string;
  iconContainerClassName?: string;
  labelClassName?: string;
  messageClassName?: string;
}

export default function Notice({
  icon = "/icon_tip.svg",
  iconAlt = "tip",
  label,
  message,
  containerClassName,
  iconContainerClassName,
  labelClassName,
  messageClassName,
}: NoticeProps) {
  return (
    <div
      className={cn(
        "flex bg-[#FEF3EF] gap-2 items-center rounded-2xl py-[2px] mx-[18px]",
        containerClassName
      )}
    >
      <div
        className={cn(
          "flex gap-[2px] items-center border-2 border-brand rounded-2xl py-[5px] px-[8px] bg-white",
          iconContainerClassName
        )}
      >
        <ImageWrapper
          src={icon}
          alt={iconAlt}
          containerClassName="relative aspect-auto w-[13px] h-4"
          objectFit="cover"
        />
        {label && (
          <span className={cn("text-brand font-bold text-xs", labelClassName)}>
            {label}
          </span>
        )}
      </div>
      <div className={cn("text-[11.7px] font-bold", messageClassName)}>
        {message}
      </div>
    </div>
  );
}
