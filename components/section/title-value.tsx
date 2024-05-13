import type { FC, ReactNode } from "react";

const SectionTitleValue: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="md:px-8 px-4 h-16 flex justify-between items-center border-b border-gray-200 last:border-none">
      <span className="text-gray-600">{title}</span>
      {children}
    </div>
  );
};

export default SectionTitleValue;
