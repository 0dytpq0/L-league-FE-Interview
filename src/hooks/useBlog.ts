"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { uploadImageToS3 } from "@/app/(afterLogin)/_utils/awsUpload";
import { getAuthHeaders } from "@/utils/cookies";
import { Categories } from "@/constants/data";
import {
  BlogCreateRequest,
  BlogCreateResponse,
  BlogFormData,
  CategoryRequest,
  CategoryResponse,
} from "@/types/blog";
import { validateBlogForm } from "@/app/(afterLogin)/_utils/validateBlog";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
/**
 * 카테고리 목록을 조회하는 훅
 */
export function useCategories(params: CategoryRequest) {
  return useQuery<CategoryResponse>({
    queryKey: ["categories", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        page_size: params.page_size.toString(),
      });

      const response = await fetch(
        `${BASE_URL}/api/v1/category?${queryParams}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("카테고리 목록 조회에 실패했습니다");
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
}

/**
 * 블로그 생성 훅
 * React Query의 useMutation을 사용하여 블로그 생성 API를 호출합니다.
 */
export function useCreateBlog() {
  const router = useRouter();
  return useMutation<BlogCreateResponse, Error, BlogFormData>({
    mutationFn: async (formData: BlogFormData) => {
      // 유효성 검사
      const validationError = validateBlogForm(formData);
      if (validationError) {
        throw new Error(validationError);
      }

      // 이미지 업로드
      const mainImageUrl = await uploadImageToS3(formData.mainImage, "main_");

      // 서브 이미지 처리
      let subImageUrl = null;
      if (formData.subImage) {
        subImageUrl = await uploadImageToS3(formData.subImage, "sub_");
      }

      // 카테고리 ID 찾기
      const categoryId = Categories.indexOf(formData.category);

      // API 요청 데이터 준비
      const requestData: BlogCreateRequest = {
        category: categoryId,
        title: formData.title,
        main_image: mainImageUrl,
        content: formData.content,
      };

      if (subImageUrl) {
        requestData.sub_image = subImageUrl;
      }

      // 블로그 생성 API 호출
      const response = await fetch(`${BASE_URL}/api/v1/blog`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(requestData),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      return (await response.json()) as BlogCreateResponse;
    },
    onSuccess: (res) => {
      alert("블로그가 성공적으로 등록되었습니다!");
      router.replace(`/${res.id}`);
    },
    onError: (error) => {
      console.error("블로그 등록 중 오류 발생:", error);
      alert(
        error instanceof Error
          ? error.message
          : "블로그 등록 중 오류가 발생했습니다."
      );
    },
  });
}

export interface BlogListRequest {
  category_id?: number;
  category_name?: string;
  title?: string;
  page: number;
  page_size: number;
}

export interface BlogUser {
  id: number;
  email: string;
  status: string;
  name: string;
  phone_number: string;
  profile_image: string;
}

export interface BlogCategory {
  id: number;
  name: string;
}

export interface BlogItem {
  user: BlogUser;
  category: BlogCategory;
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  main_image: string;
  sub_image: string;
  content: string;
}

export interface BlogListResponse {
  count: number;
  totalCnt: number;
  pageCnt: number;
  curPage: number;
  nextPage: number;
  previousPage: number;
  data: BlogItem[];
}

/**
 * 블로그 목록을 조회하는 훅
 */
export function useBlogList(params: BlogListRequest) {
  return useQuery<BlogListResponse>({
    queryKey: ["blogList", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        // category_id: params.category_id?.toString() || "1",
        // category_name: params.category_name || "일상생활",
        // title: params.title || "",
        page: params.page.toString(),
        page_size: params.page_size.toString(),
      });
      const response = await fetch(`${BASE_URL}/api/v1/blog?${queryParams}`, {
        method: "GET",
        headers: getAuthHeaders(),

        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("블로그 목록 조회에 실패했습니다");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}
