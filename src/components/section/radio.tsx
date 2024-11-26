import type { FC, ReactNode } from "react";
import Radio, { type RadioProps } from "../form/radio";
import cx from "clsx";

interface SectionRadioProps extends RadioProps {
  children?: ReactNode;
}

const SectionRadio: FC<SectionRadioProps> = ({ children, ...props }) => {
  return (
    <div
      className={cx(
        "md:px-8 px-4 py-5 border-b flex justify-between items-center",
        { "opacity-50": props.disabled }
      )}
    >
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
