"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";
import ImageWrapper from "@/app/_component/ImageWrapper";
import { getTokenFromCookie } from "@/utils/cookies";

export default function AuthButton() {
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();
  const token = getTokenFromCookie();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error) => {
        console.error("로그아웃 실패:", error);
        alert("로그아웃에 실패했습니다.");
      },
    });
  };
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <div
      onClick={token ? handleLogout : handleLogin}
      className={isPending ? "opacity-50 cursor-wait" : "cursor-pointer"}
    >
      <ImageWrapper
        src="/page_user.svg"
        alt="user"
        containerClassName="relative aspect-auto w-[22px] h-[27px]"
        objectFit="contain"
      />
    </div>
  );
}
