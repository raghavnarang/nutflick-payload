import type { FC, InputHTMLAttributes } from "react";
import cx from "classnames";

interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefix?: string;
  suffix?: string;
  inputWrapperClassName?: string;
  number?: boolean;
}

const Textbox: FC<TextboxProps> = ({
  label,
  prefix,
  suffix,
  inputWrapperClassName,
  number,
  ...rest
}) => (
  <div className="flex flex-col">
    <label htmlFor={rest.name} className="mb-2">
      {label}
    </label>
    <div
      className={cx(
        "border border-gray-400 focus:border-gray-600 rounded overflow-hidden flex",
        inputWrapperClassName
      )}
    >
      {prefix && (
        <span className="px-3 bg-gray-200 flex items-center">{prefix}</span>
      )}
      <input
        {...rest}
        type={number ? "number" : "text"}
        id={rest.name}
        className={cx("outline-none py-1 px-2 w-full", rest.className)}
      />
      {suffix && (
        <span className="px-3 bg-gray-200 flex items-center">{suffix}</span>
      )}
    </div>
  </div>
);

export default Textbox;
