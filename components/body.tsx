import type { FC, ReactNode } from "react";
import cx from "classnames";

interface BodyProps {
  children?: ReactNode;
  className?: string;
}

const Body: FC<BodyProps> = ({ children, className }) => (
  <div className={cx("flex justify-center", className)}>
    <div className="container">{children}</div>
  </div>
);

export default Body;
export type { BodyProps };
