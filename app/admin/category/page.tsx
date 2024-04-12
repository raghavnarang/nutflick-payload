import Back from "@/components/Icons/back";
import AddNewCategory from "@/components/admin/product-category/add-new";
import CategoryTableItem from "@/components/admin/product-category/table-item";
import { fetchCategories } from "@/features/server/admin/product_category";
import Link from "next/link";

const CategoryPage = async () => {
  const cats = await fetchCategories();

  return (
    <div>
      <div className="flex items-center gap-5 mb-10">
        <Link href="/admin">
          <Back />
        </Link>
        <h1 className="text-xl font-medium">Product Categories</h1>
      </div>
      <div className="flex gap-10 flex-col md:flex-row">
        <div className="md:w-1/2 max-w-sm">
          <AddNewCategory />
        </div>
        <div className="md:w-1/2 lg:w-full">
          <h2 className="mb-2">Available Categories</h2>
          <table className="w-full border">
            <thead>
              <tr className="text-left border-b bg-gray-50">
                <th className="py-2 px-4 w-14">ID</th>
                <th className="py-2 px-4">Category</th>
              </tr>
            </thead>
            <tbody>
              {!cats.length && (
                <tr>
                  <td colSpan={3} className="p-10 text-center">
                    No Categories
                  </td>
                </tr>
              )}

              {cats
                .sort((a, b) => a.id - b.id)
                .map((cat) => (
                  <CategoryTableItem category={cat} key={cat.id} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
