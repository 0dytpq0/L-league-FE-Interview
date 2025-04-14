"use client";

import { useState, useRef } from "react";
import { BlogFormData } from "@/types/blog";
import { useCreateBlog } from "@/hooks/useBlog";
import { validateBlogForm } from "../_utils/validateBlog";

export function useBlogForm() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImage, setSubImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: createBlog, isPending } = useCreateBlog();
  console.log("selectedCategory", selectedCategory);
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
      category: selectedCategory || 5,
    };
    console.log("formData", formData);
    // 유효성 검사
    const validationError = validateBlogForm(formData);
    if (validationError) {
      alert(validationError);
      return;
    }

    createBlog(formData);
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
