import type { FC, ReactNode } from "react";
import Radio, { type RadioProps } from "../form/radio";

interface SectionRadioProps extends RadioProps {
  children?: ReactNode;
}

const SectionRadio: FC<SectionRadioProps> = ({ children, ...props }) => {
  return (
    <div className="md:px-8 px-4 py-5 border-b flex justify-between items-center">
      <Radio
        {...props}
        wrapperClassName="flex !items-start !gap-3"
        className="mt-1.5"
      />
      {children}
    </div>
  );
};

export default SectionRadio;
