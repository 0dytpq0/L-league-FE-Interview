"use client";

import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useBlogList } from "@/hooks/useBlog";
import SliderWrapper from "./SliderWrapper";
import ImageWrapper from "../../_component/ImageWrapper";

interface TopViewsSliderProps {
  limit?: number;
}

export default function TopViewsSlider({ limit = 10 }: TopViewsSliderProps) {
  const { data: blogList } = useBlogList({
    page: 1,
    page_size: limit,
  });

  if (!blogList?.data.length) {
    return (
      <div className="flex justify-center items-center h-[206px]">
        <p className="text-gray-500">표시할 블로그가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mx-4 tablet:mx-8 ">
      <SliderWrapper>
        {blogList.data.map((blog, index) => (
          <SwiperSlide
            key={blog.id}
            className="max-w-[120px] tablet:max-w-[150px] "
          >
            <Link href={`/blog/${blog.id}`}>
              <div className="relative w-[120px] h-[206px] rounded-lg overflow-hidden tablet:w-[150px] tablet:h-[220px]">
                <ImageWrapper
                  src={blog.main_image || "/icon_main.svg"}
                  alt={blog.title}
                  containerClassName="relative aspect-auto w-full h-full"
                  objectFit="cover"
                  sizes="(max-width: 768px) 120px, 150px"
                  imageClassName="transition-transform duration-300 hover:scale-105"
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
    </div>
  );
}
