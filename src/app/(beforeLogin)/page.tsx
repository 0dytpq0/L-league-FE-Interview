"use client";
import Footer from "./_component/Footer";
import Notice from "./_component/Notice";
import { Suspense, useMemo, useState } from "react";
import MainHeader from "./_component/MainHeader";
import { NOTICE_MESSAGE } from "@/constants/message";
import ImageWrapper from "../_component/ImageWrapper";
import { useCategories } from "@/hooks/useBlog";
import BlogList from "./_component/BlogList";
import TabMenu from "./_component/TabMenu";
import TopViewsSlider from "./_component/TopViewsSlider";
import { useRouter, useSearchParams } from "next/navigation";
import SearchModal from "./_component/SearchModal";
import Link from "next/link";
import Loading from "../loading";

export default function Main() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTitle = searchParams.get("title");

  const { data: categories } = useCategories({
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
      <Notice
        message={NOTICE_MESSAGE.main}
        label="공지"
        containerClassName="min-w-[390px] whitespace-nowrap"
      />

      {/* 조회수 TOP 10 */}
      <div className="flex items-center gap-1 py-[10px] mx-3 tablet:mx-7">
        <ImageWrapper
          src={"/icon_rank.svg"}
          alt="rank"
          containerClassName="relative aspect-auto w-6 h-6 tablet:w-7 tablet:h-7 mr-1"
          objectFit="cover"
        />
        <span className="text-xl font-bold tablet:text-2xl">조회수 TOP 10</span>
        <ImageWrapper
          src={"/icon_next.svg"}
          alt="next"
          containerClassName="relative aspect-auto w-6 h-6 mt-[1px] tablet:w-7 tablet:h-7"
          objectFit="cover"
        />
      </div>
      {/* 조회수 슬라이드 */}
      <Suspense fallback={<Loading />}>
        <TopViewsSlider limit={10} />
      </Suspense>

      {/* 탭  */}
      <TabMenu
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      {searchTitle && (
        <div className="flex items-center justify-between mx-3 mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700 font-medium flex items-center">
            <ImageWrapper
              src="/icon_search.svg"
              alt="search"
              containerClassName="w-5 h-5 mr-2"
              objectFit="contain"
            />
            <span>{`"${searchTitle}" 검색 결과`}</span>
          </p>
          <Link href={`/`} className="text-blue-700 font-bold">
            전체보기
          </Link>
        </div>
      )}

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
