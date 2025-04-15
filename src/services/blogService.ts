import { BlogListRequest, BlogListResponse } from "@/types/blog";

interface CategoriesResponse {
  data: { id: number; name: string }[];
  total: number;
}

// 서버 컴포넌트에서 사용할 카테고리 데이터 가져오는 함수
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category?page=1&page_size=10`,
      { cache: "no-store" } // SSR을 위해 캐시 비활성화
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    // 에러 발생 시 기본값 반환
    return { data: [], total: 0 };
  }
}

// 서버 컴포넌트에서 사용할 블로그 목록 데이터 가져오는 함수
export async function getBlogList(
  params: BlogListRequest
): Promise<BlogListResponse> {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== 0) {
        queryParams.append(key, String(value));
      }
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blog?${queryParams}`,
      { cache: "no-store" } // SSR을 위해 캐시 비활성화
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blog list");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blog list:", error);
    // 에러 발생 시 기본값 반환
    return {
      data: [],
      count: 0,
      pageCnt: 1,
      totalCnt: 0,
      curPage: 1,
      nextPage: 0,
      previousPage: 0,
    };
  }
}
