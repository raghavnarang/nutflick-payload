import { Plus } from "@/components/Icons";
import Edit from "@/components/Icons/edit";
import Eye from "@/components/Icons/eye";
import DeleteProduct from "@/components/admin/product-list/delete-product";
import Button from "@/components/button";
import { fetchProducts } from "@/features/server/admin/product";
import Link from "next/link";

const ProductList = async () => {
  const products = await fetchProducts();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl mb-5 font-medium">Products</h1>
        <Link href="/admin/product/new">
          <Button isInfo icon={Plus}>
            Add New
          </Button>
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="text-left border-b bg-gray-50">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4 w-1/3">Product</th>
            <th className="py-2 px-4">Variants</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2 px-4">{product.id}</td>
              <td className="py-2 px-4">
                <Link
                  href={`/admin/product/${product.id}`}
                  className="border-b border-gray-200 hover:border-gray-500"
                >
                  {product.title}
                </Link>
              </td>
              <td className="py-2 px-4">
                {(JSON.parse(product.variant_seq as string) as number[]).length}
              </td>
              <td className="py-2 px-4 flex gap-2">
                <Link href={`/product/${product.slug}`}>
                  <Button isInfo small icon={Eye}>
                    View
                  </Button>
                </Link>
                <Link href={`/admin/product/${product.id}`}>
                  <Button isInfo small icon={Edit}>
                    Edit
                  </Button>
                </Link>
                <DeleteProduct
                  productId={product.id}
                  productName={product.title}
                />
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={4} className="p-10 text-center">
                No Products
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
