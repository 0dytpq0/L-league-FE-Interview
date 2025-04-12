"use client";

import Input from "@/app/_component/Input";
import Notice from "@/app/(beforeLogin)/_component/Notice";
import ImageUploader from "@/app/(afterLogin)/_component/ImageUploader";
import Header from "@/app/_component/Header";
import { NOTICE_MESSAGE } from "@/constants/message";
import { useState } from "react";
import TextArea from "@/app/_component/TextArea";
import Checkbox from "@/app/_component/Checkbox";
import SelectBox from "../_component/SelectBox";

export default function Create() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImage, setSubImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const categories = ["일상생활", "맛집소개", "제품후기", "IT정보"];

  const handleMainImageChange = (file: File | null) => {
    setMainImage(file);
  };

  const handleSubImageChange = (file: File | null) => {
    setSubImage(file);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAgreementChange = (checked: boolean) => {
    setIsAgreed(checked);
  };

  const handleSubmit = () => {
    if (!mainImage) {
      alert("대표사진을 선택해주세요.");
      return;
    }

    if (!selectedCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (!isAgreed) {
      alert("Blog 이용 정책 동의가 필요합니다.");
      return;
    }

    console.log({
      mainImage,
      subImage,
      category: selectedCategory,
    });

    alert("폼이 제출되었습니다!");
  };
  return (
    <div>
      <Header isMain={false} title="글 수정" />
      <div className="flex flex-col gap-6 mx-5">
        <Notice message={NOTICE_MESSAGE.create} containerClassName="mx-0" />
        <Input
          id="title"
          label="타이틀(30자 이내)"
          placeholder="타이틀을 입력해주세요"
          labelClassName="text-black"
          required
        />
        <div className="flex gap-[30px]">
          <ImageUploader
            id="mainImage"
            label="대표사진"
            onChange={handleMainImageChange}
            required
            containerClassName="flex-1"
          />
          <ImageUploader
            id="subImage"
            label="서브사진"
            onChange={handleSubImageChange}
            containerClassName="flex-1"
          />
        </div>
        <SelectBox
          id="category"
          label="카테고리"
          options={categories}
          selectedOption={selectedCategory}
          onChange={handleCategoryChange}
          required
        />
        <TextArea
          id="content"
          label="내용(10자 이상)"
          placeholder="블로그 글을 작성해주세요"
          labelClassName="text-black"
          required
        />
        <Checkbox
          label="Blog 이용 정책 위반 시 글 삭제에 동의합니다."
          required
          onChange={handleAgreementChange}
          className="mt-4 mb-6"
        />
        <button
          type="button"
          onClick={handleSubmit}
          // disabled={!mainImage || !selectedCategory || !isAgreed}
          className="py-4 px-4 bg-brand text-white rounded-lg hover:brightness-95 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          제출
        </button>
      </div>
    </div>
  );
}
