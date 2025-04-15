"use server";

import { BlogListRequest } from "@/types/blog";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function getBlogList(params: BlogListRequest) {
  const queryParams = new URLSearchParams();
  const token = await getCookie("accessToken", { cookies });
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== 0) {
      queryParams.append(key, String(value));
    }
  });
  const response = await fetch(
    `${process.env.API_URL}/api/v1/blog?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("블로그 목록 조회에 실패했습니다");
  }
  return response.json();
}
