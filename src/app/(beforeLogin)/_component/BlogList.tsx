import { BlogItem, BlogListResponse } from "@/hooks/useBlog";
import BlogListItem from "./BlogListItem";

interface BlogListProps {
  blogList: BlogListResponse | undefined;
}

/**
 * 블로그 목록 컴포넌트 - 블로그 데이터를 받아 목록으로 표시
 */
export default function BlogList({ blogList }: BlogListProps) {
  // 데이터가 없는 경우 처리
  if (!blogList?.data || blogList.data.length === 0) {
    return (
      <div className="w-full mt-[38px] flex flex-col gap-[26px]">
        <p className="text-center text-gray-500">등록된 블로그가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-[38px] flex flex-col gap-[26px]">
      {blogList.data.map((blog: BlogItem) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
