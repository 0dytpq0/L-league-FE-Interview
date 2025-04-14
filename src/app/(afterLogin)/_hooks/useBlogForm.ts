"use client";

import { useState, useRef } from "react";
import { BlogFormData } from "@/types/blog";
import { useCreateBlog, useUpdateBlog } from "@/hooks/useBlog";
import { validateBlogForm } from "../_utils/validateBlog";

interface UseBlogFormProps {
  isUpdate?: boolean;
  blogId?: number;
}

export function useBlogForm({
  isUpdate = false,
  blogId,
}: UseBlogFormProps = {}) {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImage, setSubImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: createBlog, isPending: isCreatePending } = useCreateBlog();
  const { mutate: updateBlog, isPending: isUpdatePending } = useUpdateBlog();
  const isPending = isUpdate ? isUpdatePending : isCreatePending;
  const handleMainImageChange = (file: File | null) => {
    setMainImage(file);
  };

  const handleSubImageChange = (file: File | null) => {
    setSubImage(file);
  };

  const handleCategoryChange = (category: number) => {
    setSelectedCategory(category);
  };

  const handleAgreementChange = (checked: boolean) => {
    setIsAgreed(checked);
  };

  const handleSubmit = async () => {
    if (!isAgreed) {
      alert("Blog 이용 정책 동의가 필요합니다.");
      return;
    }

    const title = titleRef.current?.value || "";
    const content = contentRef.current?.value || "";

    const formData: BlogFormData = {
      title,
      content,
      mainImage,
      subImage,
      category: selectedCategory || 5,
    };

    const validationError = validateBlogForm(formData);
    if (validationError) {
      alert(validationError);
      return;
    }
    if (isUpdate && blogId) {
      // 블로그 수정 로직
      updateBlog({
        blog_id: blogId,
        ...formData,
      });
    } else {
      // 블로그 생성 로직
      createBlog(formData);
    }
  };

  return {
    mainImage,
    subImage,
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
  };
}
