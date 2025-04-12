import Input from "../_component/Input";

export default function Login() {
  return (
    <div className="flex flex-col justify-between w-full h-full mx-auto">
      <div className="flex flex-col gap-y-3 items-center mx-5 ">
        <span className="text-brand font-bold text-2xl">BLOG</span>
        <Input
          id="userId"
          label="아이디"
          type="text"
          placeholder="실명을 입력해 주세요"
        />
        <Input
          id="userPassword"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
        />
      </div>
      <button className="mx-4 py-3 mb-[33px] bg-[#B4B4B4] rounded-lg">
        <span className="text-white text-center font-bold">로그인</span>
      </button>
    </div>
  );
}
