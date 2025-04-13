"use client";

import DetailHeader from "../_component/DetailHeader";

export default function Detail() {
  return (
    <>
      <DetailHeader title="블로그 글 타이틀" />
      <div className="flex flex-col gap-4 mx-5">
        <div className="w-full h-[210px] bg-green-500 rounded-lg mx-[2px]"></div>
        <span className="text-gray text-[12.7px]">
          작성일시: 2025.04.07 12:00
        </span>
        <p className="text-gray font-bold text-[12.7px]">
          블로그 글 내용 어쩌고 저쩌고! 이러쿵 처러쿵맞아요신나요asdfasdfasdfa
          sdfasdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdfasdfasdfasdf...
        </p>
      </div>
    </>
  );
}
