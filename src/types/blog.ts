// 블로그 관련 타입 정의

// 사용자 정보 타입
export interface User {
  id: number;
  email: string;
  status: string;
  name: string;
  phone_number: string;
  profile_image: string;
}

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
  mainImage: File | string | null;
  subImage: File | string | null;
  category: number;
}

// 블로그 목록 API 요청 타입
export interface BlogListRequest {
  category_id?: number;
  category_name?: string;
  title?: string;
  page: number;
  page_size: number;
}

// 블로그 아이템 타입
export interface BlogItem {
  user: User;
  category: CategoryItem;
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

export interface BlogUpdateRequest {
  category: number;
  title: string;
  mainImage: File | string | null;
  subImage: File | string | null;
  content: string;
}
