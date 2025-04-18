"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageToS3 } from "@/app/(afterLogin)/_utils/awsUpload";
import { getAuthHeaders } from "@/utils/cookies";
import { QUERY_KEYS } from "@/constants/queryKeys";
import {
  BlogCreateRequest,
  BlogCreateResponse,
  BlogFormData,
  BlogItem,
  BlogListRequest,
  BlogListResponse,
  BlogUpdateRequest,
  CategoryRequest,
  CategoryResponse,
} from "@/types/blog";
import { validateBlogForm } from "@/app/(afterLogin)/_utils/validateBlog";
import { useRouter } from "next/navigation";
import { getBlogDetail } from "@/services/getBlogDetail";
import getBlogList from "@/services/getBlogList";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
/**
 * 카테고리 목록을 조회하는 훅
 */
export function useCategories(params: CategoryRequest) {
  // queryKey를 정확히 일치시키기 위해 파라미터를 새 객체로 바꾸지 않고 원시 값을 사용
  return useQuery<CategoryResponse, Error, { id: number; name: string }[]>({
    queryKey: [
      QUERY_KEYS.CATEGORIES,
      { page: params.page, page_size: params.page_size },
    ],
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
    select: (data) => [
      { id: 0, name: "전체" },
      ...(data?.data.filter((c) => c.id !== 5) || []),
    ],
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
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
      const validationError = validateBlogForm(formData);
      if (validationError) {
        throw new Error(validationError);
      }

      const mainImageUrl = await uploadImageToS3(
        formData.mainImage as File,
        "main_"
      );
      let subImageUrl = null;
      if (formData.subImage) {
        subImageUrl = await uploadImageToS3(formData.subImage as File, "sub_");
      }

      const requestData: BlogCreateRequest = {
        category: formData.category,
        title: formData.title,
        main_image: mainImageUrl,
        content: formData.content,
      };

      if (subImageUrl) {
        requestData.sub_image = subImageUrl;
      }

      const response = await fetch(`${BASE_URL}/api/v1/blog`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(requestData),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (res) => {
      alert("블로그가 성공적으로 등록되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
      router.replace(`/blog/${res.id}?created=true`);
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
    queryKey: [QUERY_KEYS.BLOG_LIST, params],
    queryFn: async () => await getBlogList(params),
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
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

/**
 * 상세 블로그 조회 훅
 */
export function useDetailBlog(blogId: string) {
  return useQuery<BlogItem>({
    queryKey: [QUERY_KEYS.BLOG_DETAIL, blogId],
    queryFn: async () => await getBlogDetail(blogId),
  });
}
/**
 * 블로그 수정 훅
 */
export function useUpdateBlog() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<
    BlogItem,
    Error,
    BlogUpdateRequest & {
      blog_id: number;
    }
  >({
    mutationFn: async ({ blog_id, ...formData }) => {
      let mainImageUrl = formData.mainImage;
      if (formData.mainImage instanceof File) {
        mainImageUrl = await uploadImageToS3(formData.mainImage, "main_");
      }

      let subImageUrl = null;

      if (formData.subImage instanceof File) {
        subImageUrl = await uploadImageToS3(formData.subImage, "sub_");
      }
      const requestData: BlogCreateRequest = {
        category: formData.category,
        title: formData.title,
        main_image: mainImageUrl as string,
        content: formData.content,
      };
      if (subImageUrl) {
        requestData.sub_image = subImageUrl;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blog/${blog_id}`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify(requestData),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`블로그 수정 실패: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (res) => {
      alert("블로그가 성공적으로 수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
      queryClient.invalidateQueries({ queryKey: ["blog", res.id] });

      router.replace(`/blog/${res.id}?updated=true`);
    },
    onError: (error) => {
      console.error("블로그 수정 중 오류 발생:", error);
      alert(
        error instanceof Error
          ? error.message
          : "블로그 수정 중 오류가 발생했습니다."
      );
    },
  });
}
