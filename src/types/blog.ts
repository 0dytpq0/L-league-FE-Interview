// 블로그 관련 타입 정의

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

// 블로그 생성 API 요청 타입
export interface BlogCreateRequest {
  category: number;
  title: string;
  main_image: string;
  sub_image?: string;
  content: string;
}

// 블로그 생성 API 응답 타입
export interface BlogCreateResponse {
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

// 블로그 폼 데이터 타입
export interface BlogFormData {
  title: string;
  content: string;
  mainImage: File | null;
  subImage: File | null;
  category: string;
}
