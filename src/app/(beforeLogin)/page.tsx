"use client";
import Image from "next/image";
import Footer from "./_component/Footer";
import SliderWrapper from "./_component/SliderWrapper";
import { SwiperSlide } from "swiper/react";
import { useState } from "react";

export default function Main() {
  const tabs = ["전체", "일상생활", "맛집소개", "제품후기", "IT정보"];
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className="relative">
      {/* header */}
      <header className="flex justify-between mx-4 py-[14px]">
        <span className="text-brand font-bold text-2xl">BLOG</span>
        <div className="w-5 h-[22px] relative aspect-auto">
          <Image
            src={"/icon_bell.svg"}
            alt="bell"
            fill
            className="object-cover cursor-pointer"
          />
        </div>
      </header>

      {/* 공지 */}
      <div className="flex bg-[#FEF3EF] gap-2 items-center rounded-2xl py-[2px] mx-[18px]">
        <div className="flex gap-[2px] items-center border-2 border-brand rounded-2xl py-[5px] px-[8px] bg-white">
          <div className="relative aspect-auto w-[13px] h-4">
            <Image
              src={"/icon_tip.svg"}
              alt="tip"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-brand font-bold text-xs">공지</span>
        </div>
        <div className=" text-[11.7px] font-bold">
          앱 출시 기념 각종 이벤트 진행 예정(공지사항 참고)
        </div>
      </div>

      {/* 조회수 TOP 10 */}
      <div className="flex items-center gap-1 py-[10px] mx-4">
        <div className="relative aspect-auto w-[25px] h-6 mr-1">
          <Image
            src={"/icon_rank.svg"}
            alt="rank"
            fill
            className="object-cover"
          />
        </div>
        <span className="text-xl font-bold">조회수 TOP 10</span>
        <div className="relative aspect-auto w-5 h-6 mt-[1px]">
          <Image
            src={"/icon_next.svg"}
            alt="next"
            fill
            className="object-cover"
          />
        </div>
      </div>
      {/* 조회수 슬라이드 */}
      <div className="w-full mx-[14px]">
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
      <div className="relative pb-16">
        <div className="w-full mt-[38px] mx-3 flex flex-col gap-[26px]">
          <div className="flex gap-4">
            <div className="bg-blue-500 w-[120px] h-[120px] rounded-lg">
              img
            </div>
            <div className="flex flex-col flex-1 gap-[6px]">
              <div className="flex justify-between items-center">
                <span className="text-[15.4px] font-bold">
                  블로그 글 타이틀
                </span>
                <div className="relative aspect-auto w-1 h-3 mr-1">
                  <Image
                    src={"/icon_more.svg"}
                    alt="more"
                    fill
                    className="object-cover"
                  />
                </div>
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
