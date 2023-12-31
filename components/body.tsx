import { Suspense, type FC, type ReactNode } from "react";
import cx from "classnames";

interface BodyProps {
  children?: ReactNode;
  className?: string;
}

const Body: FC<BodyProps> = ({ children, className }) => (
  <Suspense>
    <div className={cx("flex justify-center", className)}>
      <div className="container">{children}</div>
    </div>
  </Suspense>
);

export default Body;
export type { BodyProps };
