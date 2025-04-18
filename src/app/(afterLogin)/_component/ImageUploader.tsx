"use client";

import ImageWrapper from "@/app/_component/ImageWrapper";
import { ChangeEvent, useRef, useState } from "react";

interface ImageUploaderProps {
  id: string;
  label: string;
  defaultValue?: string | null;
  onChange?: (file: File | null) => void;
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
}

export default function ImageUploader({
  id,
  label,
  defaultValue,
  onChange,
  containerClassName,
  labelClassName,
  required = false,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        e.target.value = "";
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onChange?.(file);
    } else {
      setPreview(null);
      onChange?.(null);
    }
  };

  const removePreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.(null);
  };

  const handleImageClick = () => {
    if (preview) {
      return null;
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${containerClassName}`}>
      <div className="w-full h-[150px] tablet:h-[250px] bg-input rounded-lg flex items-center justify-center overflow-hidden">
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {!preview ? (
          <div
            onClick={handleImageClick}
            className="w-full h-full flex items-center justify-center cursor-pointer "
          >
            <ImageWrapper
              src="/icon_plus.svg"
              alt="plus"
              containerClassName="w-6 h-6"
              objectFit="contain"
            />
          </div>
        ) : (
          <div onClick={handleImageClick} className="w-full h-full relative">
            <ImageWrapper
              src={preview}
              alt={id}
              containerClassName="w-full h-full"
              sizes="(max-width: 768px) 150px, 250px"
              objectFit="contain"
              priority={true}
              loading="eager"
            />
            <div
              className="absolute top-2 right-2 z-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                removePreview();
              }}
            >
              <ImageWrapper
                src="/icon_close.svg"
                alt="close"
                containerClassName="w-4 h-4 bg-transparent rounded-full tablet:w-6 tablet:h-6"
                objectFit="contain"
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={`text-gray text-[13.5px] font-bold flex gap-[5px] ${labelClassName}`}
      >
        {label}{" "}
        {required && (
          <div className="bg-brand w-[5px] h-[5px] rounded-full mt-1"></div>
        )}
      </div>
    </div>
  );
}
