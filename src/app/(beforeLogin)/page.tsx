"use client";
import Footer from "./_component/Footer";
import Notice from "./_component/Notice";
import { useMemo, useState } from "react";
import MainHeader from "./_component/MainHeader";
import { NOTICE_MESSAGE } from "@/constants/message";
import ImageWrapper from "../_component/ImageWrapper";
import { useCategories } from "@/hooks/useBlog";
import BlogList from "./_component/BlogList";
import TabMenu from "./_component/TabMenu";
import TopViewsSlider from "./_component/TopViewsSlider";
import { useRouter, useSearchParams } from "next/navigation";
import SearchModal from "./_component/SearchModal";

export default function Main() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTitle = searchParams.get('title');
  
  const { data: categories, isPending } = useCategories({
    page: 1,
    page_size: 10,
  });
  const tabs = useMemo(
    () => [
      { id: 0, name: "전체" },
      ...(categories?.data.filter((c) => c.id !== 5) || []),
    ],
    [categories?.data]
  );

  if (isPending) {
    return <div>로딩중...</div>;
  }

  // 검색 기능 처리
  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleSearch = (searchTerm: string) => {
    router.push(`/?title=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative">
      {/* 검색 모달 */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={handleCloseModal} 
        onSearch={handleSearch} 
      />

      {/* header */}
      <MainHeader title="BLOG" onSearchClick={handleSearchClick} />

      {/* 공지 */}
      <Notice message={NOTICE_MESSAGE.main} label="공지" />

      {/* 조회수 TOP 10 */}
      <div className="flex items-center gap-1 py-[10px] mx-3">
        <ImageWrapper
          src={"/icon_rank.svg"}
          alt="rank"
          containerClassName="relative aspect-auto w-[25px] h-6 mr-1"
          objectFit="cover"
        />
        <span className="text-xl font-bold">조회수 TOP 10</span>
        <ImageWrapper
          src={"/icon_next.svg"}
          alt="next"
          containerClassName="relative aspect-auto w-5 h-6 mt-[1px]"
          objectFit="cover"
        />
      </div>
      {/* 조회수 슬라이드 */}
      <TopViewsSlider limit={10} />
      {/* 탭  */}
      <TabMenu
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      {/* 검색어가 있는 경우 표시 */}
      {searchTitle && (
        <div className="mx-3 mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700 font-medium flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>&ldquo;{searchTitle}&rdquo; 검색 결과</span>
          </p>
        </div>
      )}
      
      {/* 블로그 글 목록 */}
      <div className="relative pb-16 mx-3">
        <BlogList 
          selectedTab={selectedTab} 
          tabs={tabs} 
          pageSize={10} 
          title={searchTitle || undefined}
        />
      </div>

      <Footer />
    </div>
  );
}
