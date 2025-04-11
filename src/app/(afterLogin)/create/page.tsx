import Notice from "@/app/(beforeLogin)/_component/Notice";
import Header from "@/app/_component/Header";
import { NOTICE_MESSAGE } from "@/constants/message";

export default function Create() {
  return (
    <div>
      <Header isMain={false} title="글 등록" />
      <Notice message={NOTICE_MESSAGE.create} />
    </div>
  );
}
