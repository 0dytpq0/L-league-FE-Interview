"use client";

import { useState, useEffect, useRef } from "react";
import Input from "@/app/_component/Input";
import ImageWrapper from "@/app/_component/ImageWrapper";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchTerm: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSearch,
}: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-20 bg-opacity-10"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 m-auto flex items-center justify-center z-30">
        <div
          className="bg-white rounded-lg w-[350px] tablet:w-[450px] desktop:w-[550px] h-[200px] p-5 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="닫기"
            >
              <ImageWrapper
                src="/icon_close.svg"
                alt="close"
                containerClassName="w-4 h-4 tablet:w-6 tablet:h-6 bg-transparent rounded-full cursor-pointer"
                objectFit="contain"
              />
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex items-end">
            <Input
              ref={inputRef}
              id="search"
              label="블로그 검색"
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="검색어를 입력하세요"
              className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-[41.6px] w-[50px] cursor-pointer"
            >
              검색
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
