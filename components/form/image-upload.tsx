"use client";

import Image from "next/image";
import { useState, type FC, useRef } from "react";
import ImageIcon from "../Icons/image";
import cx from "classnames";

export interface ImageUploadProps {
  name?: string;
  className?: string;
  label?: string;
  minimal?: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({
  label,
  name,
  className,
  minimal,
}) => {
  const [image, setImage] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = () => {
    const file = inputRef.current?.files?.[0];
    setImage(file && URL.createObjectURL(file));
  };

  const imageSize = minimal ? 48 : 80;

  return (
    <div
      className={cx(
        "cursor-pointer",
        {
          "p-5 bg-gray-100 rounded-md flex gap-5 border border-gray-300":
            !minimal,
        },
        className
      )}
      onClick={() => inputRef.current?.click()}
    >
      {!image && (
        <div
          className={cx(
            "rounded bg-gray-300 flex justify-center items-center flex-shrink-0",
            { "size-20": !minimal, "size-12": minimal }
          )}
        >
          <ImageIcon
            className={cx({ "!size-10": !minimal, "!size-7": minimal })}
          />
        </div>
      )}
      {image && (
        <Image
          src={image}
          width={imageSize}
          height={imageSize}
          alt="Product Image"
          className="rounded object-contain bg-white"
        />
      )}
      <div className={cx("flex flex-col justify-center", { hidden: minimal })}>
        {label && <p className="mb-2">{label}</p>}
        <input
          type="file"
          name={name}
          onChange={onFileChange}
          ref={inputRef}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
