"use client";

import ProductVariants from "@/components/admin/product-variants";
import ImageUpload from "@/components/form/image-upload";
import Textarea from "@/components/form/textarea";
import Textbox from "@/components/form/textbox";
import { useFormState, useFormStatus } from "react-dom";
import { addProduct } from "@/features/server/actions/admin/product";
import Button from "@/components/button";
import { useToast } from "@/features/toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AddProductFormInside = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <div className="flex justify-between items-start">
        <h1 className="text-xl mb-5 font-medium">Add Product</h1>
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
          />
          <Textarea
            name="description"
            label="Description"
            placeholder="Add Product Description"
            className="mb-5"
            disabled={pending}
          />
          <ImageUpload name="image" label="Product Image" />
        </div>
        <div className="md:w-1/2 lg:w-full">
          <h2 className="mb-2">Variants</h2>
          <ProductVariants />
        </div>
      </div>
    </div>
  );
};

const AddProduct = () => {
  const [result, action] = useFormState(addProduct, null);

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

      if (result.product) router.push(`/admin/product/${result.product?.id}`);
    }
  }, [result]);

  return (
    <form action={action}>
      <AddProductFormInside />
    </form>
  );
};

export default AddProduct;
