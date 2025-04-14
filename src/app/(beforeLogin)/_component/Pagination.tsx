import React from "react";
import { cn } from "@/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 한 번에 보여줄 페이지 번호 개수
  const maxPageNumbers = 5;

  // 현재 페이지 그룹 계산 (1-5, 6-10, ...)
  const currentGroup = Math.ceil(currentPage / maxPageNumbers);
  const startPage = (currentGroup - 1) * maxPageNumbers + 1;
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // 이전 페이지 그룹으로 이동
  const goToPreviousGroup = () => {
    if (startPage > 1) {
      onPageChange(startPage - 1);
    }
  };

  // 다음 페이지 그룹으로 이동
  const goToNextGroup = () => {
    if (endPage < totalPages) {
      onPageChange(endPage + 1);
    }
  };

  if (totalPages < 1) return null;

  return (
    <div className="flex justify-center items-center mt-6 gap-1">
      {/* 이전 페이지 그룹 버튼 */}
      {startPage > 1 && (
        <button
          onClick={goToPreviousGroup}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
        >
          &lt;
        </button>
      )}

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full cursor-pointer",
            currentPage === pageNumber
              ? "bg-brand text-white"
              : "hover:bg-gray-100"
          )}
        >
          {pageNumber}
        </button>
      ))}

      {/* 다음 페이지 그룹 버튼 */}
      {endPage < totalPages && (
        <button
          onClick={goToNextGroup}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
        >
          &gt;
        </button>
      )}
    </div>
  );
}
