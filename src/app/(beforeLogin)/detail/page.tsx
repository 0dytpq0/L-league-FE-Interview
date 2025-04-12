"use client";

import DetailHeader from "../_component/DetailHeader";

export default function Detail() {


  return (
    <div>
      <DetailHeader title="블로그 글 타이틀" />
      <div className="mx-5">
        <div>img</div>
        <span>작성일시: 2025.04.07 12:00</span>
        <p>
          블로그 글 내용 어쩌고 저쩌고! 이러쿵 처러쿵맞아요신나요asdfasdfasdfa
          sdfasdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdfasdfasdfasdf...
        </p>
      </div>
    </div>
  );
}
