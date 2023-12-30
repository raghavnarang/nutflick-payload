import type { ComponentProps, FC } from "react";
import cx from "classnames";
import { Icon } from "./Icons/types";

interface ButtonProps extends ComponentProps<"button"> {
  icon?: FC<Icon>;
  large?: boolean;
  small?: boolean;
  isSecondary?: boolean;
}

const Button: FC<ButtonProps> = ({
  icon: IconComp,
  large = false,
  isSecondary = false,
  small = false,
  ...props
}) => (
  <button
    {...props}
    className={cx(
      "justify-center items-center disabled:opacity-50 transition-colors",
      {
        "flex w-full text-lg rounded-lg py-3": large,
        "inline-flex rounded px-3 py-2": !large && !small,
        "bg-red-500 hover:bg-red-600 text-white": !isSecondary,
        "bg-gray-200 hover:bg-gray-300 text-gray-700": isSecondary,
        "flex text-sm px-3 py-1 rounded": small,
      },
      props.className
    )}
  >
    {IconComp && (
      <IconComp className={cx("mr-2", { "!w-4 !h-4 mr-1": small })} />
    )}
    {props.children}
  </button>
);

export default Button;
