import type { FC, InputHTMLAttributes } from "react";
import cx from "classnames";

interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Textbox: FC<TextboxProps> = ({ label, ...rest }) => (
  <div className="flex flex-col">
    <label htmlFor={rest.name} className="mb-2">
      {label}
    </label>
    <input
      {...rest}
      type="text"
      id={rest.name}
      className={cx(
        "border border-gray-400 focus:border-gray-600 outline-none rounded py-1 px-2",
        rest.className
      )}
    />
  </div>
);

export default Textbox;
