"use client";

import ErrorIcon from "@/components/Icons/error";
import BigMessage from "@/components/big-message";
import Button from "@/components/button";
import type { FC } from "react";

interface ErrorProps {
  error?: Error;
  reset: () => {};
}

const Error: FC<ErrorProps> = ({ reset }) => (
  <BigMessage icon={ErrorIcon} button={{ onClick: reset, text: "Try Again" }}>
    Something went wrong. This could be a temporary issue, please try your
    action again.
  </BigMessage>
);

export default Error;
