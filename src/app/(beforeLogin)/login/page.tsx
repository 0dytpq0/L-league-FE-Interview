export default function Login() {
  return (
    <div className="flex flex-col justify-between w-full h-full mx-auto">
      <div className="flex flex-col gap-y-3 items-center mx-5 ">
        <span className="text-brand font-bold text-2xl">BLOG</span>
        <div className="flex flex-col w-full gap-1">
          <label
            htmlFor="userId"
            className="text-[#CCCCCC] text-[15px] font-bold"
          >
            아이디
          </label>
          <input
            type="text"
            id="userId"
            placeholder="실명을 입력해 주세요"
            className="bg-input py-4 px-[10px] rounded-lg placeholder:text-[#C2C2C2] placeholder:text-sm"
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <label
            htmlFor="userPassword"
            className="text-[#CCCCCC] text-[15px] font-bold"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="userPassword"
            placeholder="비밀번호를 입력해 주세요"
            className="bg-input py-4 px-[10px] rounded-lg placeholder:text-[#C2C2C2] placeholder:text-sm"
          />
        </div>
      </div>
      <button className="mx-4 py-3 mb-[33px] bg-[#B4B4B4] rounded-lg">
        <span className="text-white text-center font-bold">로그인</span>
      </button>
    </div>
  );
}
