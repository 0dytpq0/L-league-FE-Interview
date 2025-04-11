import ImageWrapper from "./ImageWrapper";

interface Props {
  src: string;
  alt: string;
  href: string;
}

export default function FooterLinkWrapper({ src, alt, href }: Props) {
  return (
    <ImageWrapper
      src={src}
      alt={alt}
      href={href}
      containerClassName="relative aspect-auto w-[22px] h-[27px]"
      objectFit="contain"
    />
  );
}
