"use client";

import { AUTH_QUERY_KEY } from "@/constants/queryKey";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// API 관련 타입 정의
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
        headers: {
          "Content-Type": "application/json",
        },
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

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
    },
  });
}

// 로그아웃 훅
export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async (): Promise<void> => {
      const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-store"
      });
      
      if (!response.ok) {
        throw new Error("로그아웃에 실패했습니다");
      }
      
      return;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [AUTH_QUERY_KEY] });
    }
  });
}
