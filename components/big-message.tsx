import type { FC, ReactNode } from "react";
import type { Icon } from "./Icons/types";
import Button from "./button";

interface BigMessageProps {
  icon: FC<Icon>;
  children: string;
  button?: {
    text: ReactNode;
    onClick?: () => void;
  };
}

const BigMessage: FC<BigMessageProps> = ({
  icon: IconComp,
  children: message,
  button,
}) => (
  <div className="w-full min-h-full flex flex-col items-center justify-center">
    <IconComp className="!w-20 !h-20 text-red-500 mb-5" />
    <div className="max-w-md flex flex-col items-center">
      <p className="text-xl text-center">{message}</p>
      {button && (
        <Button onClick={button.onClick} className="mt-7 !w-1/2">
          {button.text}
        </Button>
      )}
    </div>
  </div>
);

export default BigMessage;
