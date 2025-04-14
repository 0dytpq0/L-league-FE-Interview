"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageToS3 } from "@/app/(afterLogin)/_utils/awsUpload";
import { getAuthHeaders } from "@/utils/cookies";
import {
  BlogCreateRequest,
  BlogCreateResponse,
  BlogFormData,
  BlogListRequest,
  BlogListResponse,
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
  const queryClient = useQueryClient();
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

      // API 요청 데이터 준비
      const requestData: BlogCreateRequest = {
        category: formData.category,
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
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
      router.replace(`/blog/${res.id}`);
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

/**
 * 블로그 목록을 조회하는 훅
 */
export function useBlogList(params: BlogListRequest) {
  return useQuery<BlogListResponse>({
    queryKey: ["blogList", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined || value !== 0) {
          queryParams.append(key, String(value));
        }
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

/**
 * 블로그 삭제 훅
 */
export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blogId: number) => {
      const response = await fetch(`${BASE_URL}/api/v1/blog/${blogId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("블로그 삭제에 실패했습니다");
      }

      return response.status === 204 ? true : await response.json();
    },
    onSuccess: () => {
      alert("블로그가 성공적으로 삭제되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
    },
    onError: (error) => {
      console.error("블로그 삭제 중 오류 발생:", error);
      alert(
        error instanceof Error
          ? error.message
          : "블로그 삭제 중 오류가 발생했습니다."
      );
    },
  });
}
