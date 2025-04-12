"use client";

import Input from "@/app/(beforeLogin)/_component/Input";
import Notice from "@/app/(beforeLogin)/_component/Notice";
import ImageUploader from "@/app/(afterLogin)/_component/ImageUploader";
import Header from "@/app/_component/Header";
import { NOTICE_MESSAGE } from "@/constants/message";
import { useState } from "react";

export default function Create() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImage, setSubImage] = useState<File | null>(null);

  const handleMainImageChange = (file: File | null) => {
    setMainImage(file);
  };

  const handleSubImageChange = (file: File | null) => {
    setSubImage(file);
  };

  const handleSubmit = () => {
    if (!mainImage) {
      alert("대표사진을 선택해주세요.");
      return;
    }

    console.log({
      mainImage,
      subImage,
    });

    alert("폼이 제출되었습니다!");
  };
  return (
    <div>
      <Header isMain={false} title="글 등록" />
      <div className="flex flex-col gap-6 mx-5">
        <Notice message={NOTICE_MESSAGE.create} containerClassName="mx-0" />
        <Input
          id="title"
          label="타이틀(30자 이내)"
          placeholder="타이틀을 입력해주세요"
          labelClassName="text-black"
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
        <Input
          id="category"
          label="카테고리"
          placeholder="카테고리 선택"
          labelClassName="text-black"
        />
        <Input
          id="content"
          label="내용(10자 이상)"
          placeholder="블로그 글을 작성해주세요"
          labelClassName="text-black"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!mainImage}
          className="mt-4 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
