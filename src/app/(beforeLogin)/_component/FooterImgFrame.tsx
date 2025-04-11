import Image from "next/image";
import Link from "next/link";

interface Props {
  src: string;
  alt: string;
  href: string;
}

export default function FooterImgFrame({ src, alt, href }: Props) {
  return (
    <Link
      href={href}
      className="relative aspect-auto w-[22px] h-[27px] cursor-pointer"
    >
      <Image src={src} alt={alt} fill className="object-contain" />
    </Link>
  );
}
