import Input from "@/app/(beforeLogin)/_component/Input";
import Notice from "@/app/(beforeLogin)/_component/Notice";
import Header from "@/app/_component/Header";
import { NOTICE_MESSAGE } from "@/constants/message";

export default function Create() {
  return (
    <div>
      <Header isMain={false} title="글 등록" />
      <div className="flex flex-col gap-6">
        <Notice message={NOTICE_MESSAGE.create} />
        <Input
          id="title"
          label="타이틀(30자 이내)"
          placeholder="타이틀을 입력해주세요"
          labelClassName="text-black"
        />
        <div>
          <div>대표사진</div>
          <div>서브</div>
        </div>
        <Input
          id="category"
          label="카테고리"
          placeholder="카데고리 선택"
          labelClassName="text-black"
        />
        <Input
          id="content"
          label="내용(10자 이상)"
          placeholder="블로그 글을 작성해주세요"
          labelClassName="text-black"
        />
      </div>
    </div>
  );
}
