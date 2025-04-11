import FooterLinkWrapper from "./FooterImgFrame";
import ImageWrapper from "./ImageWrapper";

export default function Footer() {
  return (
    <>
      <footer className="fixed bottom-0 w-full max-w-[1024px] h-14 shadow-footer bg-white">
        <ImageWrapper
          src={"/create.svg"}
          alt="create"
          href="/create"
          containerClassName="absolute bottom-[75px] right-[14px] w-16 h-16 aspect-auto pointer-cursor"
          objectFit="contain"
        />
        <div className="flex justify-around items-center w-full h-full">
          <FooterLinkWrapper src="/page_home.svg" alt="home" href="/" />
          <FooterLinkWrapper src="/page_chat.svg" alt="chat" href="/" />
          <FooterLinkWrapper src="/page_rank.svg" alt="rank" href="/" />
          <FooterLinkWrapper src="/page_user.svg" alt="login" href="/login" />
        </div>
      </footer>
    </>
  );
}
