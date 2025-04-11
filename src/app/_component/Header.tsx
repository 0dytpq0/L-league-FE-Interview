import { cn } from "@/utils/cn";
import ImageWrapper from "../(beforeLogin)/_component/ImageWrapper";
import BackButton from "./BackButton";

interface HeaderProps {
  isMain: boolean;
  title: string;
  headerClassName?: string;
  titleClassName?: string;
}

export default function Header({
  isMain,
  title,
  headerClassName,
  titleClassName,
}: HeaderProps) {
  if (isMain) {
    return (
      <header
        className={cn(
          "flex justify-between items-center mx-4 py-[14px]",
          headerClassName
        )}
      >
        <span className={cn("text-brand font-bold text-2xl", titleClassName)}>
          {title}
        </span>
        <ImageWrapper
          src={"/icon_bell.svg"}
          alt="bell"
          containerClassName="w-5 h-[22px] relative aspect-auto"
          objectFit="cover"
          imageClassName="cursor-pointer"
        />
      </header>
    );
  }

  return (
    <header
      className={cn("flex items-center mx-5 py-5 gap-5", headerClassName)}
    >
      {/* <ImageWrapper
        src={"/icon_prev.svg"}
        alt="prev"
        containerClassName="w-7 h-8 relative aspect-auto"
        objectFit="cover"
        imageClassName="cursor-pointer"
      /> */}
      <BackButton />
      <span className={cn("font-bold text-xl", titleClassName)}>{title}</span>
    </header>
  );
}
