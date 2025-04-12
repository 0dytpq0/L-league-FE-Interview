"use client";

import Header from "@/app/_component/Header";
import BackButton from "@/app/_component/BackButton";

interface DetailHeaderProps {
  title: string;
}

export default function DetailHeader({ title }: DetailHeaderProps) {
  return (
    <Header
      title={title}
      leftComponent={<BackButton />}
      rightComponent={
        <button
          className="text-[15.4px] font-bold bg-transparent border-0 cursor-pointer"
          aria-label="수정하기"
        >
          수정
        </button>
      }
    />
  );
}
