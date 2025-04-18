"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/_component/Header";
import ImageWrapper from "@/app/_component/ImageWrapper";
import SearchModal from "./SearchModal";

interface MainHeaderProps {
  title: string;
  onSearch?: (searchTerm: string) => void;
}

export default function MainHeader({ title }: MainHeaderProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const router = useRouter();
  // 검색 모달 열기
  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  // 검색 모달 닫기
  const handleCloseModal = () => {
    setIsSearchModalOpen(false);
  };

  // 검색 처리
  const handleSearch = (searchTerm: string) => {
    router.push(`/?title=${encodeURIComponent(searchTerm)}`);
    setIsSearchModalOpen(false);
  };
  return (
    <>
      {/* 검색 모달 */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={handleCloseModal}
        onSearch={handleSearch}
      />

      {/* 헤더 */}
      <Header
        title={title}
        headerClassName="mx-4 tablet:mx-8 py-[14px] tablet:py-[18px]"
        titleClassName="text-brand font-bold text-2xl tablet:text-3xl"
        rightComponent={
          <div className="flex items-center gap-4">
            <button
              onClick={handleSearchClick}
              className="cursor-pointer"
              aria-label="검색"
            >
              <ImageWrapper
                src={"/icon_search.svg"}
                alt="search"
                containerClassName="w-5 h-5 tablet:w-6 tablet:h-6 relative aspect-auto"
                objectFit="cover"
              />
            </button>
            <ImageWrapper
              src={"/icon_bell.svg"}
              alt="bell"
              containerClassName="w-6 h-6 tablet:w-7 tablet:h-7 relative aspect-auto"
              objectFit="cover"
              imageClassName="cursor-pointer"
            />
          </div>
        }
      />
    </>
  );
}
