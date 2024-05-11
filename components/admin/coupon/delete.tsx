"use client";

import Trash from "@/components/Icons/trash";
import Button from "@/components/button";
import Modal from "@/components/modal";
import { removeCoupon } from "@/features/server/actions/admin/coupon";
import { useToast } from "@/features/toast";
import { type FC, useState, useEffect, useTransition } from "react";

interface DeleteCouponProps {
  id: number;
  couponName: string;
}

const DeleteCoupon: FC<DeleteCouponProps> = ({ id, couponName }) => {
  const [isOpen, setOpen] = useState(false);
  const [inProgress, startTransition] = useTransition();
  const [result, setResult] =
    useState<Awaited<ReturnType<typeof removeCoupon>>>();

  const message = `Do you want to delete this coupon${
    couponName ? `: ${couponName}` : ""
  }?`;

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
            onClick: () => {
              startTransition(async () => {
                setResult(await removeCoupon(id));
                setOpen(false);
              });
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

export default DeleteCoupon;
