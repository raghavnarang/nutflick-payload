import type { FC, ReactNode } from "react";
import type { Icon } from "./Icons/types";
import Button from "./button";
import Link, { LinkProps } from "next/link";

interface BigMessageProps {
  icon: FC<Icon>;
  children: string;
  button?: {
    text: ReactNode;
    onClick?: () => void;
    link?: LinkProps;
  };
  secondaryButton?: {
    text: ReactNode;
    onClick?: () => void;
    link?: LinkProps;
  };
  disabled?: boolean;
}

const BigMessage: FC<BigMessageProps> = ({
  icon: IconComp,
  children: message,
  button,
  secondaryButton,
  disabled = false,
}) => (
  <div className="w-full min-h-full flex flex-col items-center justify-center">
    <IconComp className="!w-20 !h-20 text-primary mb-5" />
    <div className="max-w-md flex flex-col items-center">
      <p className="text-xl text-center">{message}</p>
      <div className="flex w-full gap-3 justify-center">
        {button && (
          <Button
            onClick={button.onClick}
            large
            className="mt-7 !w-1/2"
            disabled={disabled}
          >
            {button.link ? (
              <Link {...button.link}>{button.text}</Link>
            ) : (
              button.text
            )}
          </Button>
        )}
        {secondaryButton && (
          <Button
            onClick={secondaryButton.onClick}
            large
            isSecondary
            className="mt-7 !w-1/2"
            disabled={disabled}
          >
            {secondaryButton.link ? (
              <Link {...secondaryButton.link}>{secondaryButton.text}</Link>
            ) : (
              secondaryButton.text
            )}
          </Button>
        )}
      </div>
    </div>
  </div>
);

export default BigMessage;
