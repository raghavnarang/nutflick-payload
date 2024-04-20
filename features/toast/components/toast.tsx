"use client";

import { ToastProps } from "../types";
import { FC, useMemo } from "react";
import cx from "classnames";
import Tick from "@/components/Icons/tick";
import Error from "@/components/Icons/error";
import Image from "next/image";
import { Status } from "@/shared/types/status";

const Toast: FC<ToastProps> = ({ type = Status.pending, product, message }) => {
  const Icon = useMemo(() => {
    switch (type) {
      case Status.success:
        return Tick;
      case Status.error:
        return Error;
      default:
        return undefined;
    }
  }, [type]);

  return (
    <div
      className={cx(
        "rounded border border-solid px-5 transition duration-500",
        {
          "border-red-700 text-red-700 bg-red-200": type === Status.error,
          "border-green-700 text-green-700 bg-green-200":
            type === Status.success,
          "border-gray-700 text-gray-700 bg-gray-200": type === Status.pending,
        }
      )}
    >
      {product && (
        <div className="py-3 flex items-center border-b border-solid border-inherit">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            width={64}
            height={64}
            className="rounded object-cover mr-3"
          />
          <p>{product.title}</p>
        </div>
      )}
      <p className="py-3 flex items-center">
        {Icon && <Icon className="mr-3 shrink-0" />}
        {message}
      </p>
    </div>
  );
};

export default Toast;
