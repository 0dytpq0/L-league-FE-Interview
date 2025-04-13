import Notice from "@/app/(beforeLogin)/_component/Notice";
import Header from "@/app/_component/Header";
import BackButton from "@/app/_component/BackButton";
import { NOTICE_MESSAGE } from "@/constants/message";
import BlogCreateForm from "../_component/BlogCreateForm";

export default function Create() {
  return (
    <div>
      <Header title="글 등록" leftComponent={<BackButton />} />
      <div className="flex flex-col gap-6 mx-5">
        <Notice message={NOTICE_MESSAGE.create} containerClassName="mx-0" />
        <BlogCreateForm />
      </div>
    </div>
  );
}
