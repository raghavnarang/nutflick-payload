import type { FC, InputHTMLAttributes, ReactNode } from "react";
import cx from "clsx";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  wrapperClassName?: string;
}

const Radio: FC<RadioProps> = ({ label, wrapperClassName, ...rest }) => (
  <div className={cx("flex w-full items-center gap-2", wrapperClassName)}>
    <input
      {...rest}
      type="radio"
      id={rest.id || rest.name}
      className={cx("outline-none py-1 px-2", rest.className)}
    />
    {label && <label htmlFor={rest.id || rest.name}>{label}</label>}
  </div>
);

export default Radio;
