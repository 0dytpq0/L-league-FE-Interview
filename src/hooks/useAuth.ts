"use client";

import { AUTH_QUERY_KEY } from "@/constants/queryKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAuthHeaders,
  removeTokenFromCookie,
  saveTokenToCookie,
} from "@/utils/cookies";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 사용자 정보 조회 훅
export function useMe() {
  return useQuery({
    queryKey: [AUTH_QUERY_KEY],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
        method: "GET",
        headers: getAuthHeaders(), // 쿠키에서 토큰을 가져와 인증 헤더 생성
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("사용자 정보 조회에 실패했습니다");
      }

      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// 로그인 훅
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [AUTH_QUERY_KEY],
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("로그인에 실패했습니다");
      }

      const loginData = await response.json();
      return loginData;
    },
    onSuccess: (data) => {
      // 로그인 성공 시 쿠키에 토큰 저장
      saveTokenToCookie(data.access);
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
  });
}

// 로그아웃 훅
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async (): Promise<void> => {
      const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "GET",
        headers: getAuthHeaders(), // 쿠키에서 토큰을 가져와 인증 헤더 생성
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("로그아웃에 실패했습니다");
      }

      return;
    },
    onSuccess: () => {
      // 로그아웃 시 쿠키에서 토큰 삭제
      removeTokenFromCookie();
      queryClient.removeQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
  });
}
