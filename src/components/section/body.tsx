import type { FC, ReactNode } from "react";
import cx from "classnames";

interface SectionBodyProps {
  children?: ReactNode;
  className?: string;
}

const SectionBody: FC<SectionBodyProps> = ({ children, className }) => (
  <div className={cx("md:px-8 px-4 py-5", className)}>{children}</div>
);

export default SectionBody;
