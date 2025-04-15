"use client";

import Header from "@/app/_component/Header";
import BackButton from "@/app/_component/BackButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DetailHeaderProps {
  title: string;
  blogId: number;
  leftComponent?: React.ReactNode;
  isCreated?: string | null;
}

export default function DetailHeader({
  title,
  blogId,
  leftComponent,
  isCreated,
}: DetailHeaderProps) {
  const router = useRouter();
  return (
    <Header
      title={title}
      leftComponent={
        leftComponent || (
          <BackButton
            onClick={() => {
              if (isCreated === "created") {
                window.history.go(-2);
              } else {
                router.push("/");
              }
            }}
          />
        )
      }
      rightComponent={
        <Link
          href={`/update/${blogId}`}
          className="text-[15.4px] font-bold bg-transparent border-0 cursor-pointer"
        >
          수정
        </Link>
      }
    />
  );
}
