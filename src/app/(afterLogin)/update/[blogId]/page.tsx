"use client";

import Header from "@/app/_component/Header";
import BackButton from "@/app/_component/BackButton";
import { NOTICE_MESSAGE } from "@/constants/message";
import Notice from "@/app/(beforeLogin)/_component/Notice";
import { use } from "react";
import BlogUpdateForm from "../../_component/BlogUpdateForm";

export default function Update({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = use(params);
  return (
    <div>
      <Header title="글 수정" leftComponent={<BackButton />} />
      <div className="flex flex-col gap-6 mx-5">
        <Notice message={NOTICE_MESSAGE.create} containerClassName="mx-0" />
        <BlogUpdateForm blogId={Number(blogId)} />
      </div>
    </div>
  );
}
