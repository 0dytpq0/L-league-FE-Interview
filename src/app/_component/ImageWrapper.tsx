import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

interface BaseImageProps {
  src: string;
  alt: string;
  imageClassName?: string;
  containerClassName?: string;
  objectFit?: "contain" | "cover" | "fill" | "none";
  priority?: boolean;
  sizes?: string;
  quality?: number;
  loading?: "lazy" | "eager";
}

interface LinkImageProps extends BaseImageProps {
  href?: string;
  linkClassName?: string;
}

type ImageWrapperProps = LinkImageProps;

export default function ImageWrapper({ ...props }: ImageWrapperProps) {
  const {
    src,
    alt,
    imageClassName = "",
    containerClassName,
    objectFit = "contain",
    priority = false,
    sizes,
    quality = 75,
    loading = "lazy",
  } = props;

  const ImageComponent = (
    <div className={cn("relative aspect-auto", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-${objectFit} ${imageClassName}`}
        priority={priority}
        sizes={sizes}
        quality={quality}
        loading={loading}
      />
    </div>
  );

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={cn(`cursor-pointer ${props.linkClassName}`)}
      >
        {ImageComponent}
      </Link>
    );
  }

  return ImageComponent;
}
