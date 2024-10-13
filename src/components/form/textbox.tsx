import type { FC, InputHTMLAttributes } from "react";
import cx from "clsx";

interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefix?: string;
  suffix?: string;
  inputWrapperClassName?: string;
  outerWrapperClassname?: string;
  number?: boolean;
  decimal?: boolean;
}

const Textbox: FC<TextboxProps> = ({
  label,
  prefix,
  suffix,
  inputWrapperClassName,
  outerWrapperClassname,
  number,
  decimal,
  ...rest
}) => (
  <div className={cx("flex flex-col", outerWrapperClassname)}>
    {label && (
      <label htmlFor={rest.name} className="mb-2">
        {label}
      </label>
    )}
    <div
      className={cx(
        "border border-gray-300 focus:border-gray-600 rounded overflow-hidden flex h-10",
        inputWrapperClassName
      )}
    >
      {prefix && (
        <span className="px-3 bg-gray-200 flex items-center">{prefix}</span>
      )}
      <input
        {...rest}
        type={number || decimal ? "number" : rest.type || "text"}
        step={decimal ? 0.01 : undefined}
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
