"use server";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function getBlogDetail(blogId: string) {
  const token = await getCookie("accessToken", { cookies });
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/blog/${blogId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { tags: [QUERY_KEYS.BLOG_DETAIL, blogId] },
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("블로그 상세 정보 가져오기 실패:", error);
    return null;
  }
}
