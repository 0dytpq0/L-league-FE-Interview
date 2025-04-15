"use client";

import ImageWrapper from "@/app/_component/ImageWrapper";
import { useDetailBlog } from "@/hooks/useBlog";
import dayjs from "dayjs";
import DetailHeader from "./DetailHeader";

interface DetailFormProps {
  blogId: string;
  isCreated: string;
}

export default function DetailForm({ blogId, isCreated }: DetailFormProps) {
  const { data: blog, isLoading } = useDetailBlog(blogId);
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
      <DetailHeader title={blog.title} blogId={blog.id} isCreated={isCreated} />
      <div className="flex flex-col gap-4 mx-5 tablet:mx-8">
        <div className="flex items-center justify-center w-full max-w-5xl mx-auto rounded-lg overflow-hidden">
          <div className="relative w-full pb-[56.25%] max-w-[500px]  shadow-2xl">
            <ImageWrapper
              src={blog.main_image || "/images/empty-image.png"}
              alt={blog.title || "게시글 이미지"}
              containerClassName="absolute inset-0 w-full h-full"
              priority={true}
              loading="eager"
              quality={100}
              objectFit="cover"
              imageClassName="rounded-lg transition-transform duration-300 hover:translate-y-[-5px]"
            />
          </div>
        </div>
        <span className="text-gray text-[12.7px] tablet:text-[15px]">
          작성일시: {dayjs(blog.created_at).format("YYYY.MM.DD HH:mm")}
        </span>
        <p className="text-gray font-bold text-[12.7px] tablet:text-[15px]">
          {blog.content}
        </p>
        {/* {blog.sub_image && (
    
              <div className="w-full rounded-lg mx-[2px] mt-4 overflow-hidden">
                <ImageWrapper
                  src={blog.sub_image}
                  alt="서브 이미지"
                  containerClassName="w-full h-[210px] tablet:h-[400px] relative"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  objectFit="cover"
                  imageClassName="rounded-lg"
                />
              </div>
            )} */}
      </div>
    </>
  );
}
