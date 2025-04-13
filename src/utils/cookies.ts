"use client";

/**
 * 쿠키에 액세스 토큰을 저장하는 함수
 * @param token 저장할 액세스 토큰
 * @param maxAge 쿠키 유효 기간 (초 단위, 기본값 1일)
 */
export const saveTokenToCookie = (token: string, maxAge: number = 86400) => {
  document.cookie = `accessToken=${token}; path=/; max-age=${maxAge}; SameSite=Strict`;
};

/**
 * 쿠키에서 액세스 토큰을 가져오는 함수
 * @returns 저장된 액세스 토큰 또는 null
 */
export const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') {
    return null; // 서버 사이드에서 실행 시 null 반환
  }
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'accessToken') {
      return value;
    }
  }
  return null;
};

/**
 * 쿠키에서 액세스 토큰을 삭제하는 함수
 */
export const removeTokenFromCookie = () => {
  document.cookie = 'accessToken=; path=/; max-age=0';
};

/**
 * API 요청에 사용할 인증 헤더를 생성하는 함수
 * @returns 인증 헤더가 포함된 헤더 객체
 */
export const getAuthHeaders = (): HeadersInit => {
  const token = getTokenFromCookie();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
