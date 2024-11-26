import type { FC, ReactNode } from "react";
import cx from "clsx";

interface SectionFooterProps {
  children?: ReactNode;
  className?: string;
}

const SectionFooter: FC<SectionFooterProps> = ({ children, className }) => (
  <div className={cx("md:px-8 px-4 py-5 border-t border-gray-300", className)}>
    {children}
  </div>
);

export default SectionFooter;
