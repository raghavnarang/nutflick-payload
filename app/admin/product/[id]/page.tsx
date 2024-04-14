import AddEditProduct from "@/components/admin/add-edit-product";
import { fetchProduct } from "@/features/server/admin/product";
import { fetchCategories } from "@/features/server/admin/product_category";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { FC } from "react";

interface EditProductProps {
  params: { id: string };
}

const EditProduct: FC<EditProductProps> = async ({ params: { id } }) => {
  const product = await fetchProduct(+id, createClient(cookies()));
  const categories = await fetchCategories();

  return <AddEditProduct editProduct={product} categories={categories} />;
};

export default EditProduct;
