/**
 * React Query에서 사용할 queryKey 상수 모음
 */

export const QUERY_KEYS = Object.freeze({
  // 카테고리 관련 쿼리 키
  CATEGORIES: "categories",

  // 블로그 관련 쿼리 키
  BLOG_LIST: "blogList",
  BLOG_DETAIL: "blogDetail",

  // 사용자 관련 쿼리 키
  USER: "user",
  USER_PROFILE: "userProfile",

  // 기타 쿼리 키
  SEARCH: "search",
});
