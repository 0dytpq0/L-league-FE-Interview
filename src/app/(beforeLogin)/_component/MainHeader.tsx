"use client";

import Header from "@/app/_component/Header";
import ImageWrapper from "@/app/_component/ImageWrapper";

interface MainHeaderProps {
  title: string;
}

export default function MainHeader({ title }: MainHeaderProps) {
  return (
    <Header 
      title={title} 
      headerClassName="mx-4 py-[14px]"
      titleClassName="text-brand font-bold text-2xl"
      rightComponent={
        <ImageWrapper
          src={"/icon_bell.svg"}
          alt="bell"
          containerClassName="w-5 h-[22px] relative aspect-auto"
          objectFit="cover"
          imageClassName="cursor-pointer"
        />
      }
    />
  );
}
