"use client";

import Input from "@/app/_component/Input";
import Notice from "@/app/(beforeLogin)/_component/Notice";
import ImageUploader from "@/app/(afterLogin)/_component/ImageUploader";
import Header from "@/app/_component/Header";
import BackButton from "@/app/_component/BackButton";
import { NOTICE_MESSAGE } from "@/constants/message";
import { useState, useRef } from "react";
import TextArea from "@/app/_component/TextArea";
import Checkbox from "@/app/_component/Checkbox";
import SelectBox from "../_component/SelectBox";
import SubmitButton from "@/app/_component/SubmitButton";
import { Categories } from "@/constants/data";
import { getAuthHeaders } from "@/utils/cookies";

// API 요청 타입 정의
interface BlogCreateRequest {
  category: number;
  title: string;
  main_image: string;
  sub_image?: string; // 선택적 필드
  content: string;
}

// AWS S3 업로드 URL 생성 API 요청 타입
interface AwsUploadUrlRequest {
  file_name: string;
}

// AWS S3 업로드 URL 응답 타입
interface AwsUploadUrlResponse {
  uploadURL: string;
  imageURL: string;
}

// API 응답 타입 정의
interface BlogCreateResponse {
  category: {
    id: number;
    name: string;
  };
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  main_image: string;
  sub_image: string | null;
  content: string;
}

export default function Create() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImage, setSubImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 제목과 내용을 위한 ref 추가
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

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
    // 유효성 검사
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

    // 제목과 내용 검증
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (!title) {
      alert("타이틀을 입력해주세요.");
      return;
    }

    if (!content || content.length < 10) {
      alert("내용을 10자 이상 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. 이미지 업로드를 위한 파일명 생성
      const mainImageFileName = `main_${Date.now()}_${mainImage.name}`;
      let subImageFileName = null;
      if (subImage) {
        subImageFileName = `sub_${Date.now()}_${subImage.name}`;
      }

      // 2. AWS S3 업로드 URL 요청 - 대표 이미지
      const mainImageUploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/aws/upload`,
        {
          method: "POST",
          headers: getAuthHeaders(), // 쿠키에서 토큰을 가져와 인증 헤더 생성
          body: JSON.stringify({
            file_name: mainImageFileName,
          } as AwsUploadUrlRequest),
          cache: "no-store",
        }
      );

      if (!mainImageUploadResponse.ok) {
        throw new Error(
          `대표 이미지 업로드 URL 생성 실패: ${mainImageUploadResponse.status}`
        );
      }

      const mainImageUploadData =
        (await mainImageUploadResponse.json()) as AwsUploadUrlResponse;

      // 3. 대표 이미지 S3에 업로드
      const mainImageUploadResult = await fetch(mainImageUploadData.uploadURL, {
        method: "PUT",
        body: mainImage,
        headers: {
          "Content-Type": mainImage.type,
        },
      });

      if (!mainImageUploadResult.ok) {
        throw new Error(`대표 이미지 S3 업로드 실패`);
      }

      // 4. 서브 이미지 처리 (있는 경우에만)
      let subImageUrl = null;
      if (subImage && subImageFileName) {
        // 서브 이미지 업로드 URL 요청
        const subImageUploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/aws/upload`,
          {
            method: "POST",
            headers: getAuthHeaders(), // 쿠키에서 토큰을 가져와 인증 헤더 생성
            body: JSON.stringify({
              file_name: subImageFileName,
            } as AwsUploadUrlRequest),
            cache: "no-store",
          }
        );

        if (!subImageUploadResponse.ok) {
          throw new Error(
            `서브 이미지 업로드 URL 생성 실패: ${subImageUploadResponse.status}`
          );
        }

        const subImageUploadData =
          (await subImageUploadResponse.json()) as AwsUploadUrlResponse;

        // 서브 이미지 S3에 업로드
        const subImageUploadResult = await fetch(subImageUploadData.uploadURL, {
          method: "PUT",
          body: subImage,
          headers: {
            "Content-Type": subImage.type,
          },
        });

        if (!subImageUploadResult.ok) {
          throw new Error(`서브 이미지 S3 업로드 실패`);
        }

        subImageUrl = subImageUploadData.imageURL;
      }

      // 5. 카테고리 ID 찾기 (인덱스 사용)
      // 카테고리 인덱스를 ID로 사용 (0부터 시작)
      const categoryId = Categories.indexOf(selectedCategory);

      // 6. API 요청 데이터 준비
      // 요청 데이터 구성 (API 요구사항에 맞게 구성)
      const requestData: BlogCreateRequest = {
        category: categoryId,
        title: title,
        main_image: mainImageUploadData.imageURL, // S3 이미지 URL 사용
        content: content,
      };

      // 서브 이미지가 있는 경우에만 추가 (선택적 필드)
      if (subImageUrl) {
        requestData.sub_image = subImageUrl;
      }

      // 4. API 호출
      // 환경 변수에서 BASE_URL 가져와서 API 엔드포인트 구성
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blog`,
        {
          method: "POST",
          headers: getAuthHeaders(), // 쿠키에서 토큰을 가져와 인증 헤더 생성
          body: JSON.stringify(requestData),
          cache: "no-store", // 캐싱하지 않도록 설정 (API 요청마다 최신 데이터 사용)
        }
      );

      // 5. 응답 처리
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const responseData: BlogCreateResponse = await response.json();
      console.log("블로그 생성 성공:", responseData);

      alert("블로그가 성공적으로 등록되었습니다!");
      // TODO: 성공 후 블로그 목록 페이지로 이동 또는 다른 처리
    } catch (error) {
      console.error("블로그 등록 중 오류 발생:", error);
      alert("블로그 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <Header title="글 등록" leftComponent={<BackButton />} />
      <div className="flex flex-col gap-6 mx-5">
        <Notice message={NOTICE_MESSAGE.create} containerClassName="mx-0" />
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
          isPending={isSubmitting}
          isDisabled={!mainImage || !selectedCategory || !isAgreed}
          size="lg"
          isFullWidth
          pendingText="제출 중..."
        >
          제출
        </SubmitButton>
      </div>
    </div>
  );

  // S3 업로드 방식으로 변경하여 이 함수는 사용하지 않음
}
