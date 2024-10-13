"use client";

import { FC, ReactNode, createContext, useContext, useState } from "react";
import { ToastListItem } from "./types";
import ToastContainer from "./components/toast-container";

interface ToastContextProps {
  addToast: (props: ToastListItem) => void;
}

interface ToastProviderProps {
  children: ReactNode;
  dismissDuration?: number;
}

const ToastContext = createContext<ToastContextProps>({ addToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: FC<ToastProviderProps> = ({
  children,
  dismissDuration = 5000,
}) => {
  const [toasts, setToasts] = useState<ToastListItem[]>([]);

  const dismissToast = (id: number) => {
    setToasts((state) => state.filter((toast) => toast.id !== id));
  };

  const addToast = (toast: ToastListItem) => {
    const { id, isDismissable } = toast;

    setToasts((state) => {
      let isToastAlreadyExists = false;

      const newToasts = state.map((toastItem) => {
        if (toastItem.id === id) {
          isToastAlreadyExists = true;
          return toast;
        }

        return toastItem;
      });

      return isToastAlreadyExists ? newToasts : [...state, toast];
    });

    if (isDismissable) {
      const timeout = setTimeout(() => {
        dismissToast(id);
        clearTimeout(timeout);
      }, dismissDuration);
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};
