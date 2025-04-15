import { CategoryRequest } from "@/types/blog";

/**
 *
 * @param params {page: number, page_size: number}
 * @returns Promise<CategoryResponse>
 */
export async function getCategories(params: CategoryRequest) {
  const response = await fetch(
    `${
      process.env.API_URL
    }/api/v1/category?page=${params.page.toString()}&page_size=${params.page_size.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("카테고리 데이터 패칭 실패");
  }
  return response.json();
}
