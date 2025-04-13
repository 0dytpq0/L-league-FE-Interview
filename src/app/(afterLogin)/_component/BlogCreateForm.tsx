"use client";

import { useState, useRef } from "react";
import Input from "@/app/_component/Input";
import TextArea from "@/app/_component/TextArea";
import Checkbox from "@/app/_component/Checkbox";
import SelectBox from "../_component/SelectBox";
import SubmitButton from "@/app/_component/SubmitButton";
import ImageUploader from "@/app/(afterLogin)/_component/ImageUploader";
import { Categories } from "@/constants/data";
import { useCreateBlog } from "@/hooks/useBlog";
import { BlogFormData } from "@/types/blog";
import { validateBlogForm } from "../_utils/validateBlog";

export default function BlogCreateForm() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImage, setSubImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: createBlog, isPending } = useCreateBlog();

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

  const handleSubmit = async () => {
    // 이용 정책 동의 검사
    if (!isAgreed) {
      alert("Blog 이용 정책 동의가 필요합니다.");
      return;
    }

    const title = titleRef.current?.value || "";
    const content = contentRef.current?.value || "";

    // 폼 데이터 구성
    const formData: BlogFormData = {
      title,
      content,
      mainImage,
      subImage,
      category: selectedCategory,
    };

    // 유효성 검사
    const validationError = validateBlogForm(formData);
    if (validationError) {
      alert(validationError);
      return;
    }

    createBlog(formData);
  };

  return (
    <div className="flex flex-col gap-6 mx-5">
      <Input
        id="title"
        label="타이틀(30자 이내)"
        placeholder="타이틀을 입력해주세요"
        labelClassName="text-black"
        required
        maxLength={30}
        ref={titleRef}
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
        options={Categories}
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
        ref={contentRef}
      />
      <Checkbox
        label="Blog 이용 정책 위반 시 글 삭제에 동의합니다."
        required
        onChange={handleAgreementChange}
        containerClassName="mt-4 mb-6"
      />
      <SubmitButton
        onClick={handleSubmit}
        isPending={isPending}
        isDisabled={!mainImage || !selectedCategory || !isAgreed}
        size="lg"
        isFullWidth
        pendingText="제출 중..."
      >
        제출
      </SubmitButton>
    </div>
  );
}
