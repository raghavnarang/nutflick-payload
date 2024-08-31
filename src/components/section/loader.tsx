import type { FC } from "react";
import LoadingAnimated from "../Icons/loading-animated";

const SectionLoader: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="md:px-8 px-4 h-16 flex gap-3 items-center border-b">
      <LoadingAnimated />
      <span className="text-gray-600">{text}</span>
    </div>
  );
};

export default SectionLoader;
