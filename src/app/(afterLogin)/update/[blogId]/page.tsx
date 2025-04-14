"use client";

import Header from "@/app/_component/Header";
import BackButton from "@/app/_component/BackButton";
import { NOTICE_MESSAGE } from "@/constants/message";
import Notice from "@/app/(beforeLogin)/_component/Notice";
import BlogCreateForm from "../../_component/BlogCreateForm";
import { useDetailBlog } from "@/hooks/useBlog";
import { use } from "react";

export default function Create({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = use(params);
  console.log("blogId", blogId);
  const { data: blog, isLoading } = useDetailBlog(Number(blogId));
  console.log("blog", blog);
  return (
    <div>
      <Header title="글 수정" leftComponent={<BackButton />} />
      <div className="flex flex-col gap-6 mx-5">
        <Notice message={NOTICE_MESSAGE.create} containerClassName="mx-0" />
        <BlogCreateForm />
      </div>
    </div>
  );
}
