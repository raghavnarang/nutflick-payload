import type { ComponentProps, FC } from "react";
import cx from "classnames";

interface ButtonProps extends ComponentProps<"button"> {
  isIcon?: boolean;
}

const Button: FC<ButtonProps> = ({ isIcon, ...props }) => {
  return (
    <button
      {...props}
      className={cx(
        {
          "w-10 h-10 flex text-sm justify-center items-center bg-red-500 text-white rounded-sm disabled:opacity-50":
            isIcon,
          "block w-full text-lg text-center bg-red-500 text-white rounded-lg py-3 hover:bg-red-600 transition-colors disabled:opacity-50":
            !isIcon,
        },
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
