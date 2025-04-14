"use client";

import { useMemo } from "react";
import { BlogItem, BlogListResponse } from "@/types/blog";

/**
 * 블로그 목록을 카테고리에 따라 필터링하는 커스텀 훅
 * 카테고리 ID가 5인 경우 전체 탭(ID 0)에서 보이도록 처리
 */
export function useFilteredBlogList(
  blogList: BlogListResponse | undefined,
  selectedTabIndex: number,
  tabs: { id: number; name: string }[]
) {
  const filteredBlogList = useMemo(() => {
    if (!blogList?.data || blogList.data.length === 0) {
      return blogList;
    }

    // 선택된 탭의 ID
    const selectedTabId = tabs[selectedTabIndex]?.id;

    // 전체 탭이 선택된 경우 (id가 0인 경우)
    if (selectedTabId === 0) {
      // 모든 블로그 항목 반환 (카테고리 ID가 5인 항목 포함)
      return blogList;
    }

    // 선택된 카테고리에 맞는 블로그 항목 필터링
    const filtered = blogList.data.filter(
      (blog: BlogItem) => blog.category.id === selectedTabId
    );

    // 필터링된 데이터로 새로운 BlogListResponse 객체 생성
    return {
      ...blogList,
      count: filtered.length,
      data: filtered,
    };
  }, [blogList, selectedTabIndex, tabs]);

  return filteredBlogList;
}
