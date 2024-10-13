import type { FC, TextareaHTMLAttributes } from "react";
import cx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: FC<TextareaProps> = ({ label, ...rest }) => (
  <div className="flex flex-col">
    <label htmlFor={rest.name} className="mb-2">
      {label}
    </label>
    <textarea
      {...rest}
      id={rest.name}
      className={cx(
        "border border-gray-400 focus:border-gray-600 outline-none rounded py-1 px-2",
        rest.className
      )}
      rows={rest.rows || 5}
    />
  </div>
);

export default Textarea;
