"use server";

import { Status } from "@/shared/types/status";
import {
  insertProduct,
  updateProduct,
  deleteProduct as deleteProductFromDB,
} from "@/features/server/admin/product";
import {
  addProductSchema,
  editProductSchema,
} from "@/shared/zod-schemas/product";
import { z } from "zod";

export const addProduct = async (prevState: any, data: FormData) => {
  try {
    const result = addProductSchema.safeParse(data);
    if (!result.success) {
      console.log("Schema validation failed.");
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

export const editProduct = async (prevState: any, data: FormData) => {
  try {
    const result = editProductSchema.safeParse(data);
    if (!result.success) {
      console.log("Schema validation failed.", result.error);
      return { status: Status.error, message: "Something went wrong" };
    }

    const { deleted_variants: variantsToDelete, ...productData } = result.data;
    const product = await updateProduct(productData, variantsToDelete);
    return {
      status: Status.success,
      message: "Product edited successfully",
      product,
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const result = z.number().safeParse(productId);
    if (!result.success) {
      console.log("Schema validation failed for delete product.", result.error);
      return { status: Status.error, message: "Something went wrong" };
    }

    const id = result.data;
    await deleteProductFromDB(id);
    return {
      status: Status.success,
      message: "Product deleted successfully",
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};
