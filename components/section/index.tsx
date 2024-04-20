import type { FC, ReactNode } from "react";
import SectionHeader from "./header";

interface SectionProps {
  title: string;
  children?: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => (
  <div className="bg-gray-50 rounded-lg mb-10">
    <SectionHeader title={title} />
    {children}
  </div>
);

export default Section;
