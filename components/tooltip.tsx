"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import cx from "classnames";

interface TooltipProps {
  children: ReactNode;
  className?: string;
  timeout?: number;
}

const Tooltip: FC<TooltipProps> = ({ children, className, timeout = 2000 }) => {
  const [isVisible, setVisible] = useState(true);
  useEffect(() => {
    if (timeout !== 0) {
      const timeoutRef = setTimeout(() => {
        setVisible(false);
        clearTimeout(timeoutRef);
      }, timeout);
    }
  }, []);

  return isVisible ? (
    <div
      className={cx(
        "absolute bg-gray-800 text-white px-2 py-1 text-sm rounded-md whitespace-nowrap right-0 mt-4 before:w-0 before:h-0 before:border-8 before:border-transparent before:border-solid before:border-b-gray-800 before:absolute before:-top-4 before:right-4",
        className
      )}
    >
      {children}
    </div>
  ) : null;
};

export default Tooltip;