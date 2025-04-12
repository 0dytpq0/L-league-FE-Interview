"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin, LoginRequest } from "@/app/_hooks/useAuth";
import Input from "@/app/_component/Input";
import { cn } from "@/lib/cn";
import validateLogin from "../_lib/validateLogin";

export default function LoginForm() {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const { mutate: login, isPending } = useLogin();

  const handleLoginSuccess = () => {
    router.push("/");
  };

  const handleLoginError = (error: Error) => {
    console.error("로그인 실패:", error);
    alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData({
      ...loginData,
      [id === "userId" ? "email" : "password"]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(loginData, {
      onSuccess: handleLoginSuccess,
      onError: handleLoginError,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between w-full h-full"
    >
      <div className="flex flex-col gap-y-3 items-center mx-5">
        <span className="text-brand font-bold text-2xl">BLOG</span>
        <Input
          id="userId"
          label="아이디"
          type="text"
          placeholder="실명을 입력해 주세요"
          value={loginData.email}
          onChange={handleInputChange}
        />
        <Input
          id="userPassword"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={loginData.password}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className={cn(
          "mx-4 py-3 mb-[33px] bg-brand disabled:bg-[#B4B4B4] cursor-pointer rounded-lg hover:brightness-95 active:brightness-90 focus:outline-none",
          isPending && "brightness-95"
        )}
        disabled={validateLogin(loginData, isPending)}
      >
        <span className="text-white text-center font-bold">
          {isPending ? "로그인 중..." : "로그인"}
        </span>
      </button>
    </form>
  );
}
