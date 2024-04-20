import type { FC } from "react";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title }) => (
  <header className="md:px-8 px-4 h-16 flex items-center border-b border-solid border-gray-300">
    <span className="text-lg">{title}</span>
  </header>
);

export default SectionHeader;
