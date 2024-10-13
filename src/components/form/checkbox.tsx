import type { FC, InputHTMLAttributes } from "react";
import cx from "clsx";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, wrapperClassName, ...rest }) => (
  <div className={cx("flex w-full items-center gap-2", wrapperClassName)}>
    <input
      {...rest}
      type="checkbox"
      id={rest.name}
      className={cx("outline-none py-1 px-2", rest.className)}
    />
    {label && <label htmlFor={rest.name}>{label}</label>}
  </div>
);

export default Checkbox;
