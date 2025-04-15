"use client";

import { useState, useEffect, useCallback } from "react";
import ImageWrapper from "@/app/_component/ImageWrapper";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface MoreButtonProps {
  id: number;
  onDelete?: (id: number) => void;
}

/**
 * 더보기 버튼 컴포넌트 - 수정/삭제 옵션이 포함된 드롭다운 메뉴
 */
export default function MoreButton({ id, onDelete }: MoreButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
    setIsOpen(false);
  };

  const handleClickOutside = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative">
      <button onClick={handleToggle} className="cursor-pointer">
        <ImageWrapper
          src="/icon_more.svg"
          alt="more"
          containerClassName="relative aspect-auto w-4 h-4 tablet:h-6 w-6 mr-1"
          sizes="(max-width: 768px) 16px, 24px"
          objectFit="cover"
        />
      </button>
      <div
        className={cn(
          `absolute w-20 z-10 right-0 mt-1 bg-white shadow-md rounded-md overflow-hidden transition-all duration-200 ease-in-out max-h-0 opacity-0 transform -translate-y-2 ${
            isOpen &&
            "max-h-24 opacity-100 transform translate-y-0 pointer-events-auto"
          }`
        )}
      >
        <Link
          href={`/update/${id}`}
          className="flex items-center justify-center w-full text-left px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            // 메뉴 닫기
            setIsOpen(false);
          }}
        >
          수정
        </Link>
        <div className="h-[1px] w-full bg-gray-200 mx-auto"></div>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center w-full text-left px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer text-red-500"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
