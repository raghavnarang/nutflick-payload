import type { FC, SelectHTMLAttributes } from "react";
import cx from "clsx";

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  inputWrapperClassName?: string;
  outerWrapperClassName?: string;
  number?: boolean;
  decimal?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  inputWrapperClassName,
  number,
  decimal,
  outerWrapperClassName,
  ...rest
}) => (
  <div
    className={cx(
      "flex flex-col",
      { "opacity-50": rest.disabled },
      outerWrapperClassName
    )}
  >
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
      <select
        {...rest}
        id={rest.id || rest.name}
        className={cx("outline-none py-1 px-2 w-full", rest.className)}
      />
    </div>
  </div>
);

export default Dropdown;
