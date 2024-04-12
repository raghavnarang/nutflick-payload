"use server";

import { Status } from "@/shared/types/status";
import { z } from "zod";
import {
  insertCategory,
  updateCategory,
  deleteCategory as deleteCategoryFromDB,
} from "@/features/server/admin/product_category";
import { zfd } from "zod-form-data";

export const addCategory = async (prevState: any, data: FormData) => {
  try {
    const result = zfd.formData({ title: zfd.text() }).safeParse(data);
    if (!result.success) {
      console.log("Schema validation failed for add category.", result.error);
      return { status: Status.error, message: "Something went wrong" };
    }

    await insertCategory(result.data.title);
    return {
      status: Status.success,
      message: "Category added successfully",
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};

export const editCategory = async (prevState: any, data: FormData) => {
  try {
    const result = zfd
      .formData({ title: zfd.text(), id: zfd.numeric() })
      .safeParse(data);
    if (!result.success) {
      console.log(
        "Schema validation failed for update category.",
        result.error
      );
      return { status: Status.error, message: "Something went wrong" };
    }

    await updateCategory(result.data.title, result.data.id);
    return {
      status: Status.success,
      message: "Category updated successfully",
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const result = z.number().safeParse(id);
    if (!result.success) {
      console.log(
        "Schema validation failed for delete category.",
        result.error
      );
      return { status: Status.error, message: "Something went wrong" };
    }

    await deleteCategoryFromDB(id);
    return {
      status: Status.success,
      message: "Category deleted successfully",
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};
