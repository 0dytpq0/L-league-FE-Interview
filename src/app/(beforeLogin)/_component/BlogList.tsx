"use client";

import { useState, useMemo } from "react";
import { BlogItem, BlogListRequest, BlogListResponse } from "@/types/blog";
import { useBlogList } from "@/hooks/useBlog";
import BlogListItem from "./BlogListItem";
import Pagination from "./Pagination";

interface BlogListProps {
  initialBlogList?: BlogListResponse;
  selectedTab?: number;
  tabs?: { id: number; name: string }[];
  pageSize?: number;
  onPageChange?: (page: number) => void;
  title?: string; // 검색어 추가
}

/**
 * 블로그 목록 컴포넌트 - 블로그 데이터를 받아 목록으로 표시
 */
export default function BlogList({
  selectedTab = 0,
  tabs = [],
  pageSize = 10,
  onPageChange,
  title,
}: BlogListProps) {
  // 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1);

  // 블로그 목록 데이터 조회
  const params: BlogListRequest = {
    page: currentPage,
    page_size: pageSize,
  };

  // 카테고리 필터링
  if (selectedTab !== undefined && selectedTab !== 0) {
    params.category_id = selectedTab;
  }

  // 검색어가 있는 경우 파라미터에 추가
  if (title && title.trim() !== "") {
    params.title = title.trim();
  }

  const { data: blogList, isLoading } = useBlogList(params);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const filteredBlogList = useMemo(() => {
    if (!blogList?.data || blogList.data.length === 0) {
      return blogList;
    }

    const selectedTabId = tabs[selectedTab]?.id;
    if (selectedTabId === 0) {
      return blogList;
    }

    const filtered = blogList.data.filter(
      (blog: BlogItem) => blog.category.id === selectedTabId
    );

    return {
      ...blogList,
      count: filtered.length,
      data: filtered,
    };
  }, [blogList, selectedTab, tabs]);

  if (isLoading) {
    return (
      <div className="w-full mt-[38px] flex justify-center">
        <p className="text-center text-gray-500">로딩중...</p>
      </div>
    );
  }

  if (!filteredBlogList?.data || filteredBlogList.data.length === 0) {
    return (
      <div className="w-full mt-[38px] flex flex-col gap-[26px]">
        <p className="text-center text-gray-500">
          {title
            ? `'${title}' 검색 결과가 없습니다.`
            : "등록된 블로그가 없습니다."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="scroll-hide w-full mt-[38px] flex flex-col gap-[26px] max-h-[400px] overflow-y-auto">
        {filteredBlogList.data.map((blog: BlogItem) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={filteredBlogList.pageCnt || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
