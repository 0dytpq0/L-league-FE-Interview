import Image from "next/image";

export default function Footer() {
  const footerImgFrame = (src: string, alt: string) => {
    return (
      <div className="relative aspect-auto w-[22px] h-[27px] cursor-pointer">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 w-full h-14 shadow-footer">
      <div className="flex justify-around items-center w-full h-full">
        {footerImgFrame("/page_home.svg", "home")}
        {footerImgFrame("/page_chat.svg", "search")}
        {footerImgFrame("/page_rank.svg", "like")}
        {footerImgFrame("/page_user.svg", "user")}
      </div>
    </div>
  );
}
