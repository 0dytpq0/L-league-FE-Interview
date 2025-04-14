"use client";

import Input from "@/app/_component/Input";
import TextArea from "@/app/_component/TextArea";
import Checkbox from "@/app/_component/Checkbox";
import SelectBox from "../_component/SelectBox";
import SubmitButton from "@/app/_component/SubmitButton";
import ImageUploader from "@/app/(afterLogin)/_component/ImageUploader";
import { useBlogForm } from "../_hooks/useBlogForm";
import { useBackConfirm } from "../_hooks/useBackConfirm";
import { useCategories } from "@/hooks/useBlog";

export default function BlogCreateForm() {
  const {
    mainImage,
    selectedCategory,
    isAgreed,
    titleRef,
    contentRef,
    isPending,
    handleMainImageChange,
    handleSubImageChange,
    handleCategoryChange,
    handleAgreementChange,
    handleSubmit,
  } = useBlogForm();

  useBackConfirm();
  const { data: categories } = useCategories({
    page: 1,
    page_size: 10,
  });

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
        options={categories?.data || []}
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
