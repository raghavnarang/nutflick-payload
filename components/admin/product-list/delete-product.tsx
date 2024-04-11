"use client";

import Trash from "@/components/Icons/trash";
import Button from "@/components/button";
import Modal from "@/components/modal";
import { deleteProduct } from "@/features/server/actions/admin/product";
import { useToast } from "@/features/toast";
import { useRouter } from "next/navigation";
import { type FC, useState, useEffect } from "react";

interface DeleteProductProps {
  productId: number;
  productName?: string;
}

const DeleteProduct: FC<DeleteProductProps> = ({ productId, productName }) => {
  const [isOpen, setOpen] = useState(false);
  const [inProgress, setProgress] = useState(false);
  const [result, setResult] =
    useState<Awaited<ReturnType<typeof deleteProduct>>>();

  const message = `Do you want to delete this product${
    productName ? `: ${productName}` : ""
  }?`;

  const router = useRouter();
  const { addToast } = useToast();
  useEffect(() => {
    if (result) {
      addToast({
        id: Date.now(),
        message: result.message,
        isDismissable: true,
        type: result.status,
      });
    }
  }, [result]);

  return (
    <>
      <Button small icon={Trash} onClick={() => setOpen(!isOpen)}>
        Delete
      </Button>
      {isOpen && (
        <Modal
          button={{
            text: "Delete",
            onClick: async () => {
              setProgress(true);
              setResult(await deleteProduct(productId));
              setProgress(false);
              setOpen(false);
              router.refresh();
            },
          }}
          secondaryButton={{ text: "Cancel", onClick: () => setOpen(false) }}
          close={() => setOpen(false)}
          inProgress={inProgress}
        >
          {message}
        </Modal>
      )}
    </>
  );
};

export default DeleteProduct;
