import Header from "@/app/_component/Header";
import BackButton from "@/app/_component/BackButton";
import Link from "next/link";

interface DetailHeaderProps {
  title: string;
  blogId: number;
}

export default function DetailHeader({ title, blogId }: DetailHeaderProps) {
  return (
    <Header
      title={title}
      leftComponent={<BackButton />}
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
