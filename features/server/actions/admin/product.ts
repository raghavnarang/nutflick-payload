"use server";

import { Status } from "@/shared/types/status";
import { insertProduct } from "@/features/server/admin/product";
import { addProductSchema } from "@/shared/zod-schemas/product";

export const addProduct = async (prevState: any, data: FormData) => {
  try {
    const result = addProductSchema.safeParse(data);
    if (!result.success) {
      console.log("Schema validation failed.")
      return { status: Status.error, message: "Something went wrong" };
    }

    const productData = result.data;
    const product = await insertProduct(productData);
    return {
      status: Status.success,
      message: "Product added successfully",
      product,
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};
