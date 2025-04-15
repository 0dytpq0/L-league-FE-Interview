"use client";

import Header from "@/app/_component/Header";
import ImageWrapper from "@/app/_component/ImageWrapper";

interface MainHeaderProps {
  title: string;
  onSearchClick?: () => void;
}

export default function MainHeader({ title, onSearchClick }: MainHeaderProps) {
  return (
    <Header 
      title={title} 
      headerClassName="mx-4 py-[14px]"
      titleClassName="text-brand font-bold text-2xl"
      rightComponent={
        <div className="flex items-center gap-4">
          <button 
            onClick={onSearchClick}
            className="cursor-pointer"
            aria-label="검색"
          >
            <ImageWrapper
              src={"/icon_search.svg"}
              alt="search"
              containerClassName="w-5 h-5 relative aspect-auto"
              objectFit="cover"
            />
          </button>
          <ImageWrapper
            src={"/icon_bell.svg"}
            alt="bell"
            containerClassName="w-5 h-[22px] relative aspect-auto"
            objectFit="cover"
            imageClassName="cursor-pointer"
          />
        </div>
      }
    />
  );
}
