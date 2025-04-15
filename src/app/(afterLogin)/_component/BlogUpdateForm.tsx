"use client";

import Input from "@/app/_component/Input";
import TextArea from "@/app/_component/TextArea";
import Checkbox from "@/app/_component/Checkbox";
import SelectBox from "./SelectBox";
import SubmitButton from "@/app/_component/SubmitButton";
import ImageUploader from "@/app/(afterLogin)/_component/ImageUploader";
import { useBlogForm } from "../_hooks/useBlogForm";
import { useBackConfirm } from "../_hooks/useBackConfirm";
import { useCategories, useDetailBlog } from "@/hooks/useBlog";
import { useEffect, useMemo } from "react";
import Loading from "@/app/loading";

interface BlogUpdateFormProps {
  blogId: number;
}

export default function BlogUpdateForm({ blogId }: BlogUpdateFormProps) {
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
  } = useBlogForm({
    isUpdate: true,
    blogId,
  });
  const { data: blog, isLoading } = useDetailBlog(Number(blogId));
  useBackConfirm();

  const { data: categories } = useCategories({
    page: 1,
    page_size: 10,
  });

  const categoryList = useMemo(() => {
    const newCategories: { id: number; name: string }[] = [];
    categories?.forEach((category, idx) => {
      if (category.id !== 0) {
        newCategories.push({
          id: category.id,
          name: category.name,
        });
        if (idx === categories.length - 1) {
          newCategories.push({
            id: 5,
            name: "기타",
          });
        }
      }
    });
    return newCategories;
  }, [categories]);
  useEffect(() => {
    handleCategoryChange(blog?.category.id || 0);
    handleMainImageChange(blog?.main_image as string);
    handleSubImageChange(blog?.sub_image as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog]);

  const isExistingImg = () => {
    return !mainImage || !blog?.main_image;
  };

  if (isLoading) {
    return <Loading text="블로그 정보 로딩 중..." />;
  }

  return (
    <div className="flex flex-col gap-6 mx-5">
      <Input
        id="title"
        label="타이틀(30자 이내)"
        placeholder="타이틀을 입력해주세요"
        labelClassName="text-black"
        required
        maxLength={30}
        defaultValue={blog?.title || ""}
        ref={titleRef}
      />
      <div className="flex gap-[30px]">
        <ImageUploader
          id="mainImage"
          label="대표사진"
          onChange={handleMainImageChange}
          required
          containerClassName="flex-1"
          defaultValue={blog?.main_image || null}
        />
        <ImageUploader
          id="subImage"
          label="서브사진"
          onChange={handleSubImageChange}
          containerClassName="flex-1"
          defaultValue={blog?.sub_image || null}
        />
      </div>
      <SelectBox
        id="category"
        label="카테고리"
        options={categoryList || []}
        selectedOption={selectedCategory}
        onChange={handleCategoryChange}
        required
      />
      <TextArea
        id="content"
        label="내용(10자 이상)"
        placeholder="블로그 글을 작성해주세요"
        defaultValue={blog?.content || ""}
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
        isDisabled={isExistingImg() || !selectedCategory || !isAgreed}
        size="lg"
        isFullWidth
        pendingText="제출 중..."
      >
        제출
      </SubmitButton>
    </div>
  );
}
