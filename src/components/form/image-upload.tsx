"use client";

import Image from "next/image";
import { useState, type FC, useRef } from "react";
import ImageIcon from "../Icons/image";
import cx from "clsx";
import { Cross } from "../Icons";

export interface ImageUploadProps {
  name?: string;
  className?: string;
  label?: string;
  minimal?: boolean;
  src?: string;
}

const ImageUpload: FC<ImageUploadProps> = ({
  label,
  name,
  className,
  minimal,
  src,
}) => {
  const [image, setImage] = useState<string | undefined>(src);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = () => {
    const file = inputRef.current?.files?.[0];
    setImage(file && URL.createObjectURL(file));
  };

  const imageSize = minimal ? 64 : 80;

  return (
    <div
      className={cx(
        "cursor-pointer flex-shrink-0 relative",
        {
          "p-5 bg-gray-100 rounded-md flex gap-5 border border-gray-300":
            !minimal,
          "size-16": minimal,
        },
        className
      )}
      onClick={() => inputRef.current?.click()}
    >
      {image && (
        <span
          className="absolute size-6 bg-red-600 rounded-full -top-2 -right-2"
          onClick={(e) => {
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            setImage(undefined);
            e.stopPropagation();
          }}
        >
          <Cross className="text-white" />
        </span>
      )}
      {!image && (
        <div
          className={cx(
            "rounded bg-gray-300 flex justify-center items-center flex-shrink-0",
            { "size-20": !minimal, "size-16": minimal }
          )}
        >
          <ImageIcon
            className={cx({ "!size-10": !minimal, "!size-8": minimal })}
          />
        </div>
      )}
      {image && (
        <Image
          src={image}
          width={imageSize}
          height={imageSize}
          alt="Product Image"
          className="rounded object-contain bg-white flex-shrink-0"
        />
      )}
      <div className={cx("flex flex-col justify-center", { hidden: minimal })}>
        {label && <p className="mb-2">{label}</p>}
        <input
          type="file"
          name={inputRef.current?.value || (src && !image) ? name : ""}
          onChange={onFileChange}
          ref={inputRef}
          accept="image/*"
          className="hidden"
        />
        <span className="text-sm text-gray-500">
          Click anywhere in this box to select an image
        </span>
      </div>
    </div>
  );
};

export default ImageUpload;
