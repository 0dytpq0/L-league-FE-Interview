"use client";

import { getAuthHeaders } from "@/utils/cookies";

// AWS S3 업로드 URL 생성 API 요청 타입
export interface AwsUploadUrlRequest {
  file_name: string;
}

// AWS S3 업로드 URL 응답 타입
export interface AwsUploadUrlResponse {
  uploadURL: string;
  imageURL: string;
}

/**
 * AWS S3 업로드 URL을 요청하는 함수
 * @param fileName 업로드할 파일 이름
 * @returns 업로드 URL과 이미지 URL을 포함한 응답
 */
export const getAwsUploadUrl = async (fileName: string): Promise<AwsUploadUrlResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/aws/upload`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ file_name: fileName } as AwsUploadUrlRequest),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`이미지 업로드 URL 생성 실패: ${response.status}`);
  }

  return await response.json() as AwsUploadUrlResponse;
};

/**
 * 파일을 AWS S3에 업로드하는 함수
 * @param uploadUrl S3 업로드 URL
 * @param file 업로드할 파일
 * @returns 업로드 결과
 */
export const uploadFileToS3 = async (uploadUrl: string, file: File): Promise<Response> => {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!response.ok) {
    throw new Error(`이미지 S3 업로드 실패`);
  }

  return response;
};

/**
 * 이미지 파일을 AWS S3에 업로드하고 URL을 반환하는 함수
 * @param file 업로드할 이미지 파일
 * @param prefix 파일 이름 접두사 (main_ 또는 sub_)
 * @returns 업로드된 이미지의 URL
 * @throws 파일이 null이거나 유효하지 않은 경우 예외 발생
 */
export const uploadImageToS3 = async (file: File | null, prefix: string = "img_"): Promise<string> => {
  // 파일 null 검사
  if (!file) {
    throw new Error("업로드할 파일이 없습니다.");
  }
  
  // 파일 이름 생성
  const fileName = `${prefix}${Date.now()}_${file.name}`;
  
  // 업로드 URL 요청
  const uploadData = await getAwsUploadUrl(fileName);
  
  // S3에 파일 업로드
  await uploadFileToS3(uploadData.uploadURL, file);
  
  // 이미지 URL 반환
  return uploadData.imageURL;
};
