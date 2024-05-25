"use client";

import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";
import { memo, useEffect, type FC } from "react";

interface ShowToastProps {
  toast: {
    status: Status;
    message: string;
  };
  showErrorOnly?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

const ShowToast: FC<ShowToastProps> = ({
  toast,
  showErrorOnly = false,
  onSuccess,
  onError,
}) => {
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
    if (toast.status === Status.success) {
      onSuccess?.();
    }
    if (toast.status === Status.error) {
      onError?.();
    }
  }, [toast, showErrorOnly]);

  return null;
};

export default ShowToast;
