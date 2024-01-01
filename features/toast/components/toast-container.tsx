import { FC } from "react";
import Toast from "./toast";
import { ToastListItem } from "../types";

interface ToastContainerProps {
  toasts: Omit<ToastListItem, "isDismissable">[];
}

const ToastContainer: FC<ToastContainerProps> = ({ toasts }) =>
  toasts.length > 0 ? (
    <div className="fixed bottom-0 right-0 pr-10 pb-10 pl-10 md:pl-0 flex flex-col gap-3 max-w-full sm:max-w-xs w-full">
      {toasts.map((toast) => (
        <Toast {...toast} key={toast.id} />
      ))}
    </div>
  ) : null;

export default ToastContainer;
