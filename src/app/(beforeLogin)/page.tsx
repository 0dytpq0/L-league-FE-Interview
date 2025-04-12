"use client";
import Footer from "./_component/Footer";
import SliderWrapper from "./_component/SliderWrapper";
import Notice from "./_component/Notice";
import { SwiperSlide } from "swiper/react";
import { useState } from "react";
import Header from "../_component/Header";
import { NOTICE_MESSAGE } from "@/constants/message";
import ImageWrapper from "../_component/ImageWrapper";

export default function Main() {
  const tabs = ["전체", "일상생활", "맛집소개", "제품후기", "IT정보"];
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className="relative">
      {/* header */}
      <Header isMain={true} title="BLOG" />

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
      <div className="w-full px-[18px] py-4 flex justify-between">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="relative min-w-[35px] text-center cursor-pointer"
            onClick={() => setSelectedTab(index)}
          >
            <span className="text-[15.4px] text-[#737373] font-bold">
              {tab}
            </span>
            {selectedTab === index && (
              <div className="absolute -bottom-[5px] min-w-[35px] w-full h-[6px] bg-brand rounded-xl"></div>
            )}
          </div>
        ))}
      </div>

      {/* 블로그 글 목록 */}
      <div className="relative pb-16 mx-3">
        <div className="w-full mt-[38px] flex flex-col gap-[26px]">
          <div className="flex gap-4">
            <div className="bg-blue-500 w-[120px] h-[120px] rounded-lg">
              img
            </div>
            <div className="flex flex-col flex-1 gap-[6px]">
              <div className="flex justify-between items-center">
                <span className="text-[15.4px] font-bold">
                  블로그 글 타이틀
                </span>
                <ImageWrapper
                  src={"/icon_more.svg"}
                  alt="more"
                  containerClassName="relative aspect-auto w-1 h-3 mr-1"
                  objectFit="cover"
                />
              </div>
              <p className="text-[12.7px] text-[#A8A8A8] font-bold">본문</p>
              <span className="text-[12.7px] text-[#A8A8A8] font-bold">
                작성일시
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-500 w-[120px] h-[120px]">img</div>
            <div className="flex flex-col flex-1 gap-[6px]">
              <div className="flex justify-between items-center">
                <span className="text-[15.4px] font-bold">
                  블로그 글 타이틀
                </span>
                <div>img</div>
              </div>
              <p className="text-[12.7px] text-[#A8A8A8] font-bold">본문</p>
              <span className="text-[12.7px] text-[#A8A8A8] font-bold">
                작성일시
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-500 w-[120px] h-[120px]">img</div>
            <div className="flex flex-col flex-1 gap-[6px]">
              <div className="flex justify-between items-center">
                <span className="text-[15.4px] font-bold">
                  블로그 글 타이틀
                </span>
                <div>img</div>
              </div>
              <p className="text-[12.7px] text-[#A8A8A8] font-bold">본문</p>
              <span className="text-[12.7px] text-[#A8A8A8] font-bold">
                작성일시
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-500 w-[120px] h-[120px]">img</div>
            <div className="flex flex-col flex-1 gap-[6px]">
              <div className="flex justify-between items-center">
                <span className="text-[15.4px] font-bold">
                  블로그 글 타이틀
                </span>
                <div>img</div>
              </div>
              <p className="text-[12.7px] text-[#A8A8A8] font-bold">본문</p>
              <span className="text-[12.7px] text-[#A8A8A8] font-bold">
                작성일시
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* create 버튼 */}

      <Footer />
    </div>
  );
}
