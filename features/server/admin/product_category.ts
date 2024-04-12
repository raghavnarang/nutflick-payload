import { createClient as createActionsClient } from "@/lib/supabase/actions";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import "server-only";

export const insertCategory = async (title: string) => {
  const sbClient = createActionsClient(cookies());

  const { data: category, error } = await sbClient
    .from("product_category")
    .insert({ name: title })
    .select();

  if (error || !category || category.length === 0) {
    const errMsg = "Unable to create category";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  revalidatePath("/admin/category");

  return category[0];
};

export const fetchCategories = async () => {
  const sbClient = createServerClient(cookies());

  const { data: categories, error } = await sbClient
    .from("product_category")
    .select();

  if (error || !categories) {
    const errMsg = "Unable to fetch categories";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  return categories;
};

export const updateCategory = async (title: string, id: number) => {
  const sbClient = createActionsClient(cookies());

  const { data: category, error } = await sbClient
    .from("product_category")
    .update({ name: title })
    .eq("id", id)
    .select();

  if (error || !category || category.length === 0) {
    const errMsg = "Unable to update category";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  revalidatePath("/admin/category");

  return category[0];
};

export const deleteCategory = async (id: number) => {
  const sbClient = createActionsClient(cookies());
  const {error} = await sbClient.from("product_category").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error(
      "Unable to delete category"
    );
  }

  revalidatePath("/admin/category");
};
