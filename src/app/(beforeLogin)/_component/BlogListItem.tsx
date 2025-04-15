"use client";

import Link from "next/link";
import ImageWrapper from "@/app/_component/ImageWrapper";
import MoreButton from "./MoreButton";
import dayjs from "dayjs";
import { useDeleteBlog } from "@/hooks/useBlog";
import { BlogItem } from "@/types/blog";

interface BlogListItemProps {
  blog: BlogItem;
}

/**
 * 블로그 목록 아이템 컴포넌트
 */
export default function BlogListItem({ blog }: BlogListItemProps) {
  const { id, title, content, main_image, created_at } = blog || {};

  const { mutate: deleteBlog } = useDeleteBlog();

  const handleDelete = () => {
    if (!id) return;

    if (confirm("정말로 이 글을 삭제하시겠습니까?")) {
      deleteBlog(id);
    }
  };
  return (
    <div className="flex gap-4">
      <ImageWrapper
        src={main_image}
        alt="mainImage"
        href={`/blog/${id}`}
        imageClassName="rounded-lg"
        containerClassName="relative aspect-auto w-[120px] h-[120px] tablet:w-[180px] tablet:h-[180px]"
        sizes="(max-width: 768px) 120px, 180px"
        objectFit="contain"
      />
      <div className="flex flex-col justify-between flex-1 gap-[6px]">
        <div className="flex w-full justify-between items-center">
          <Link
            href={`/blog/${id}`}
            className="text-[15.4px] tablet:text-xl font-bold"
          >
            {title}
          </Link>
          <MoreButton id={id || 1} onDelete={handleDelete} />
        </div>
        <p className="text-[13px] tablet:text-[15px] flex-1 text-[#A8A8A8] font-bold line-clamp-3 tablet:line-clamp-5">
          {content}
        </p>
        <span className="text-[3px] tablet:text-[15px] text-[#A8A8A8] font-bold">
          작성일시 : {dayjs(created_at).format("YYYY.MM.DD HH:mm")}
        </span>
      </div>
    </div>
  );
}
