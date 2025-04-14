import { BlogFormData } from "@/types/blog";

/**
 * 블로그 폼 데이터 유효성 검사
 * @param formData 블로그 폼 데이터
 * @param isUpdate 수정 여부
 * @returns 유효성 검사 결과 (성공 시 null, 실패 시 에러 메시지)
 */
export const validateBlogForm = (
  formData: BlogFormData,
  isUpdate?: boolean
): string | null => {
  if (!formData.mainImage && !isUpdate) {
    return "대표사진을 선택해주세요.";
  }

  if (!formData.category) {
    return "카테고리를 선택해주세요.";
  }

  if (!formData.title) {
    return "타이틀을 입력해주세요.";
  }

  if (!formData.content || formData.content.length < 10) {
    return "내용을 10자 이상 입력해주세요.";
  }

  return null;
};
