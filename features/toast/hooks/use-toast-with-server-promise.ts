"use client";

import { useState } from "react";
import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";
import { ServerMessage } from "@/shared/types/server-message";
import { ProductMinimal } from "@/shared/types/product";

type UseToastWithServerPromiseHookType = (
  promiseCallback: () => Promise<ServerMessage | undefined>,
  pendingMessage?: string,
  product?: ProductMinimal,
  after?: (message?: ServerMessage) => void
) => [boolean, () => void];

const useToastWithServerPromise: UseToastWithServerPromiseHookType = (
  promiseCallback,
  pendingMessage,
  product,
  after
) => {
  const [pending, setPending] = useState(false);

  const { addToast } = useToast();

  const execute = async () => {
    const toastItem = {
      id: Date.now(),
      type: Status.pending,
      product,
    };

    if (pendingMessage) {
      addToast({ ...toastItem, message: pendingMessage });
    }

    setPending(true);

    const message = await promiseCallback();

    if (message) {
      addToast({
        ...toastItem,
        ...{
          message: message.message,
          type: message.status,
        },
        isDismissable: true,
      });
    }
    setPending(false);
    after?.(message);
  };

  return [pending, execute];
};

export default useToastWithServerPromise;
