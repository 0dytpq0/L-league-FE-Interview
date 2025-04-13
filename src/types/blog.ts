// 블로그 관련 타입 정의

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
