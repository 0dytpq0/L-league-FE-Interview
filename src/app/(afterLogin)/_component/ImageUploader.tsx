"use client";

import ImageWrapper from "@/app/_component/ImageWrapper";
import { ChangeEvent, useRef, useState } from "react";

interface ImageUploaderProps {
  id: string;
  label: string;
  onChange?: (file: File | null) => void;
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
}

export default function ImageUploader({
  id,
  label,
  onChange,
  containerClassName,
  labelClassName,
  required = false,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
      removePreview();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${containerClassName}`}>
      <div
        onClick={handleImageClick}
        className="w-full h-[100px] bg-input rounded-lg flex items-center justify-center cursor-pointer overflow-hidden relative"
        style={
          preview
            ? {
                backgroundImage: `url(${preview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {!preview && (
          <ImageWrapper
            src="/icon_plus.svg"
            alt="plus"
            containerClassName="w-6 h-6"
            objectFit="contain"
          />
        )}
      </div>
      <span
        className={`text-[#B8B8B8] text-[13.5px] font-bold ${labelClassName}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </div>
  );
}
