import Image from "next/image";
import FooterImgFrame from "./FooterImgFrame";

export default function Footer() {
  return (
    <>
      <footer className="fixed bottom-0 w-full max-w-[1024px] h-14 shadow-footer bg-white">
        <div className="absolute bottom-[75px] right-[14px] w-16 h-16 aspect-auto">
          <Image
            src={"/create.svg"}
            alt="create"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex justify-around items-center w-full h-full">
          <FooterImgFrame src="/page_home.svg" alt="home" href="/" />
          <FooterImgFrame src="/page_chat.svg" alt="chat" href="/" />
          <FooterImgFrame src="/page_rank.svg" alt="rank" href="/" />
          <FooterImgFrame src="/page_user.svg" alt="login" href="/login" />
        </div>
      </footer>
    </>
  );
}
