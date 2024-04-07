import AddEditProduct from "@/components/admin/add-edit-product";
import { fetchProduct } from "@/features/server/admin/product";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { FC } from "react";

interface EditProductProps {
  params: { slug: string };
}

const EditProduct: FC<EditProductProps> = async ({ params: { slug } }) => {
  const product = await fetchProduct(slug, createClient(cookies()));

  return <AddEditProduct editProduct={product} />;
};

export default EditProduct;
