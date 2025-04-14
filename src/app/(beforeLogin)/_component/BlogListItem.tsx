import Link from "next/link";
import ImageWrapper from "@/app/_component/ImageWrapper";
import MoreButton from "./MoreButton";
import { BlogItem } from "@/hooks/useBlog";

interface BlogListItemProps {
  blog: BlogItem;
}

/**
 * 블로그 목록 아이템 컴포넌트
 */
export default function BlogListItem({ blog }: BlogListItemProps) {
  const { id, title, content, main_image, created_at } = blog || {};
  const handleDelete = () => {
    console.log("삭제 클릭", id);
  };
  return (
    <div className="flex gap-4">
      <ImageWrapper
        src={main_image || "/icon_main.svg"}
        alt="mainImage"
        href={`/blog/${id}`}
        containerClassName="relative aspect-auto w-[120px] h-[120px] rounded-lg"
        objectFit="cover"
      />
      <div className="flex flex-col flex-1 gap-[6px]">
        <div className="flex justify-between items-center">
          <Link href={`/blog/${id}`} className="text-[15.4px] font-bold">
            {title || "블로그 글 타이틀"}
          </Link>
          <MoreButton id={id || 1} onDelete={handleDelete} />
        </div>
        <p className="text-[12.7px] text-[#A8A8A8] font-bold">
          {content || "본문"}
        </p>
        <span className="text-[12.7px] text-[#A8A8A8] font-bold">
          {created_at || "2025.04.07 12:00"}
        </span>
      </div>
    </div>
  );
}
