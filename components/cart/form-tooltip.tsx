"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import Tooltip from "../tooltip";

interface FormTooltipProps {
  timeout?: number;
  value?: { message: string };
  className?: string;
}

const FormTooltip: FC<FormTooltipProps> = ({
  value,
  timeout = 2000,
  className,
}) => {
  const [isMessageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    setMessageVisible(true);
    const timeoutRef = setTimeout(() => {
      setMessageVisible(false);
      clearTimeout(timeoutRef);
    }, timeout);
  }, [value]);

  return value && isMessageVisible ? (
    <Tooltip className={className}>{value.message}</Tooltip>
  ) : null;
};

export default FormTooltip;
