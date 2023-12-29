import type { FC } from "react";
import Sad from "./Icons/sad";
import cx from "classnames";

interface ErrorMessageProps {
  children: string;
  className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ children, className }) => (
  <div
    className={cx(
      "rounded border border-solid border-red-700 bg-red-200 text-red-700 px-5 py-2 inline-flex",
      className
    )}
  >
    <Sad className="mr-2" />
    {children}
  </div>
);

export default ErrorMessage;
