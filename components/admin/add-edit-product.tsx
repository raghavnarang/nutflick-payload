"use client";

import {
  addProduct,
  editProduct as editProductAction,
} from "@/features/server/actions/admin/product";
import { useToast } from "@/features/toast";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "../button";
import Textbox from "../form/textbox";
import Textarea from "../form/textarea";
import ImageUpload from "../form/image-upload";
import ProductVariants from "./product-variants";
import { Product } from "@/shared/types/product";

interface AddEditProductProps {
  editProduct?: Product;
}

const FormInside: FC<AddEditProductProps> = ({ editProduct }) => {
  const isEdit = !!editProduct;

  const { pending } = useFormStatus();

  return (
    <div>
      <div className="flex justify-between items-start">
        <h1 className="text-xl mb-5 font-medium">
          {isEdit ? "Edit Product" : "Add Product"}
        </h1>
        <Button type="submit" isSuccess disabled={pending}>
          Save
        </Button>
      </div>
      <div className="flex gap-10 flex-col md:flex-row">
        <div className="md:w-1/2 max-w-sm">
          <Textbox
            name="title"
            label="Title"
            placeholder="Add Product Title"
            inputWrapperClassName="mb-5"
            required
            disabled={pending}
            defaultValue={editProduct?.title || ""}
          />
          <Textarea
            name="description"
            label="Description"
            placeholder="Add Product Description"
            className="mb-5"
            disabled={pending}
            defaultValue={editProduct?.description || ""}
          />
          <ImageUpload
            name="image"
            label="Product Image"
            src={editProduct?.image || undefined}
          />
          {editProduct && (
            <input type="hidden" name="id" value={editProduct.id} />
          )}
        </div>
        <div className="md:w-1/2 lg:w-full">
          <h2 className="mb-2">Variants</h2>
          <ProductVariants editVariants={editProduct?.variants} />
        </div>
      </div>
    </div>
  );
};

const AddEditProduct: FC<AddEditProductProps> = ({ editProduct }) => {
  const actionFn = editProduct ? editProductAction : addProduct;
  const [result, action] = useFormState(actionFn, null);

  const { addToast } = useToast();
  const router = useRouter();
  useEffect(() => {
    if (result) {
      addToast({
        id: Date.now(),
        message: result.message,
        isDismissable: true,
        type: result.status,
      });

      if (result.product && !editProduct)
        router.push(`/admin/product/${result.product.id}`);
    }
  }, [result]);

  return (
    <form action={action}>
      <FormInside editProduct={editProduct} />
    </form>
  );
};

export default AddEditProduct;
