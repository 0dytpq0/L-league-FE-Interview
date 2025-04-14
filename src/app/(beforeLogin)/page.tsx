"use client";
import Footer from "./_component/Footer";
import SliderWrapper from "./_component/SliderWrapper";
import Notice from "./_component/Notice";
import { SwiperSlide } from "swiper/react";
import { useMemo, useState } from "react";
import MainHeader from "./_component/MainHeader";
import { NOTICE_MESSAGE } from "@/constants/message";
import ImageWrapper from "../_component/ImageWrapper";
import { useBlogList, useCategories } from "@/hooks/useBlog";
import BlogList from "./_component/BlogList";
import TabMenu from "./_component/TabMenu";

export default function Main() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
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

  // 블로그 목록 데이터 조회 (초기 데이터만 위해 사용)
  const { data: initialBlogList } = useBlogList({
    page: 1,
    page_size: 2,
  });

  if (isPending) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="relative">
      {/* header */}
      <MainHeader title="BLOG" />

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
      <div className="w-full  mx-3">
        <SliderWrapper>
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="w-[120px] h-[206px] bg-green-500 rounded-lg"></div>
            </SwiperSlide>
          ))}
        </SliderWrapper>
      </div>
      {/* 탭  */}
      <TabMenu
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      {/* 블로그 글 목록 */}
      <div className="relative pb-16 mx-3">
        <BlogList 
          initialBlogList={initialBlogList} 
          selectedTab={selectedTab} 
          tabs={tabs} 
          pageSize={2} 
        />
      </div>

      <Footer />
    </div>
  );
}
