"use client";

import DetailHeader from "../../_component/DetailHeader";
import ImageWrapper from "@/app/_component/ImageWrapper";
import dayjs from "dayjs";
import { use } from "react";
import { useDetailBlog } from "@/hooks/useBlog";

// 클라이언트 컴포넌트
export default function Detail({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  // React.use()로 params 래핑하여 사용
  const { blogId } = use(params);
  const { data: blog, isLoading } = useDetailBlog(Number(blogId));
  if (isLoading) {
    return <div className="flex justify-center p-10">로딩 중...</div>;
  }
  if (!blog) {
    return (
      <div className="flex justify-center p-10">
        블로그 정보를 찾을 수 없습니다.
      </div>
    );
  }
  return (
    <>
      <DetailHeader title={blog.title} blogId={blog.id} />
      <div className="flex flex-col gap-4 mx-5">
        <div className="w-full h-[210px] rounded-lg mx-[2px] overflow-hidden">
          <ImageWrapper
            src={blog.main_image || "엠프티 이미지"}
            alt={blog.title || "게시글 이미지"}
            containerClassName="w-full h-full relative"
            objectFit="cover"
            imageClassName="rounded-lg"
          />
        </div>
        <span className="text-gray text-[12.7px]">
          작성일시: {dayjs(blog.created_at).format("YYYY.MM.DD HH:mm")}
        </span>
        <p className="text-gray font-bold text-[12.7px]">{blog.content}</p>
        {blog.sub_image && (
          <div className="w-full rounded-lg mx-[2px] mt-4 overflow-hidden">
            <ImageWrapper
              src={blog.sub_image}
              alt="서브 이미지"
              containerClassName="w-full h-[210px] relative"
              objectFit="cover"
              imageClassName="rounded-lg"
            />
          </div>
        )}
      </div>
    </>
  );
}
