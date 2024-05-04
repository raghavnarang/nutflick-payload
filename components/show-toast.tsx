'use client'

import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";
import { useEffect, type FC } from "react";

interface ShowToastProps {
  toast: {
    status: Status;
    message: string;
  };
  showErrorOnly?: boolean;
}

const ShowToast: FC<ShowToastProps> = ({ toast, showErrorOnly = false }) => {
  const { addToast } = useToast();
  useEffect(() => {
    if (toast.status === Status.error || !showErrorOnly) {
      addToast({
        id: Date.now(),
        type: toast.status,
        message: toast.message,
        isDismissable: true,
      });
    }
  }, [toast, showErrorOnly]);

  return null;
};

export default ShowToast
