import LoginForm from "./_component/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description:
    "L-League 블로그에 로그인하여 당신의 이야기를 공유하고 다른 사람들의 글을 확인해보세요.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "로그인 - L-League Blog",
    description: "L-League 블로그에 로그인하여 다양한 활동을 즉기해보세요.",
    images: ["/og-login.png"],
  },
};

export default function Login() {
  return (
    <div className="flex flex-col justify-between w-full h-full mx-auto">
      <LoginForm />
    </div>
  );
}
