"use client";

import { useQuery } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 카테고리 API 요청 타입
export interface CategoryRequest {
  page: number;
  page_size: number;
}

// 카테고리 아이템 타입
export interface CategoryItem {
  id: number;
  name: string;
}

// 카테고리 API 응답 타입
export interface CategoryResponse {
  count: number;
  totalCnt: number;
  pageCnt: number;
  curPage: number;
  nextPage: number;
  previousPage: number;
  data: CategoryItem[];
}

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
      
      const response = await fetch(`${BASE_URL}/api/v1/categories?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("카테고리 목록 조회에 실패했습니다");
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
}
