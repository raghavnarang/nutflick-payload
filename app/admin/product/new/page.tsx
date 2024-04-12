import AddEditProduct from "@/components/admin/add-edit-product";
import { fetchCategories } from "@/features/server/admin/product_category";

const AddProduct = async () => {
  const categories = await fetchCategories();
  return <AddEditProduct categories={categories} />;
};

export default AddProduct;
