"use client";

import { useMemo } from "react";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useBlogList } from "@/hooks/useBlog";
import SliderWrapper from "./SliderWrapper";
import ImageWrapper from "../../_component/ImageWrapper";

interface TopViewsSliderProps {
  limit?: number;
}

export default function TopViewsSlider({ limit = 10 }: TopViewsSliderProps) {
  // 블로그 목록 가져오기 (최신순으로 가정)
  const { data: blogList, isLoading } = useBlogList({
    page: 1,
    page_size: limit,
  });

  const topBlogs = useMemo(() => {
    if (!blogList?.data || blogList.data.length === 0) {
      return [];
    }

    return blogList.data.slice(0, limit);
  }, [blogList, limit]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[206px]">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!topBlogs.length) {
    return (
      <div className="flex justify-center items-center h-[206px]">
        <p className="text-gray-500">표시할 블로그가 없습니다.</p>
      </div>
    );
  }

  return (
    <SliderWrapper>
      {topBlogs.map((blog, index) => (
        <SwiperSlide key={blog.id} className="max-w-[120px]">
          <Link href={`/blog/${blog.id}`}>
            <div className="relative w-[120px] h-[206px] rounded-lg overflow-hidden">
              <ImageWrapper
                src={blog.main_image || "/icon_main.svg"}
                alt={blog.title}
                containerClassName="relative aspect-auto w-full h-full"
                objectFit="cover"
              />
              {/* 순위 표시 */}
              <div className="absolute top-0 left-0 w-7 h-7 bg-brand text-white flex items-center justify-center font-bold rounded-br-lg z-10">
                {index + 1}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <h3 className="text-white text-sm font-bold truncate">
                  {blog.title}
                </h3>
                <p className="text-white text-xs truncate">
                  {blog.category.name}
                </p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </SliderWrapper>
  );
}
