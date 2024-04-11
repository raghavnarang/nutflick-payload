import { useRef, type FC, type ReactNode } from "react";
import BigMessage from "./big-message";
import Warning from "./Icons/warning";

interface ModalProps {
  children: string;
  button?: {
    text: ReactNode;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: ReactNode;
    onClick?: () => void;
  };
  close?: () => void;
  inProgress?: boolean;
}

const Modal: FC<ModalProps> = ({
  children,
  button,
  secondaryButton,
  close,
  inProgress = false,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={() => !inProgress && close?.()}
    >
      <div
        className="rounded-lg bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <BigMessage
          icon={Warning}
          button={button}
          secondaryButton={secondaryButton}
          disabled={inProgress}
        >
          {children}
        </BigMessage>
      </div>
    </div>
  );
};

export default Modal;
