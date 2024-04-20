import type { FC, ReactNode } from "react";

interface SectionBodyProps {
  children?: ReactNode;
}

const SectionBody: FC<SectionBodyProps> = ({ children }) => (
  <div className="md:px-8 px-4 py-5">{children}</div>
);

export default SectionBody;