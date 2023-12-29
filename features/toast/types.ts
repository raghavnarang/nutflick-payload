import { ProductMinimal } from "@/shared/types/product";
import { Status } from "@/shared/types/status";

export interface ToastProps {
  type?: Status;
  product?: ProductMinimal;
  message: string;
}

export interface ToastListItem extends ToastProps {
  id: number;
  isDismissable?: boolean;
}
