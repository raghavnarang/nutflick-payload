import { Plus } from "@/components/Icons";
import Edit from "@/components/Icons/edit";
import CouponToggleActivationListItem from "@/components/admin/coupon/toggle-activation-list-item";
import DeleteProduct from "@/components/admin/product-list/delete-product";
import Button from "@/components/button";
import { getCoupons } from "@/features/server/admin/coupon";
import Link from "next/link";
import cx from "classnames";

const ProductList = async () => {
  const coupons = await getCoupons();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl mb-5 font-medium">Coupons</h1>
        <Link href="/admin/coupon/new">
          <Button isInfo icon={Plus}>
            Add New
          </Button>
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="text-left border-b bg-gray-50">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4 w-1/3">Coupon</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id} className="border-b">
              <td className="py-2 px-4">{coupon.id}</td>
              <td className="py-2 px-4">
                <span
                  className={cx("rounded-full size-3 inline-block mr-2", {
                    "bg-green-500": coupon.is_active,
                    "bg-red-500": !coupon.is_active,
                  })}
                />
                <Link
                  href={`/admin/coupon/${coupon.id}`}
                  className="border-b border-gray-200 hover:border-gray-500"
                >
                  {coupon.coupon}
                </Link>
              </td>
              <td className="py-2 px-4 flex gap-2">
                <CouponToggleActivationListItem
                  isActive={coupon.is_active}
                  id={coupon.id}
                />
                <Link href={`/admin/coupon/${coupon.id}`}>
                  <Button isInfo small icon={Edit}>
                    Edit
                  </Button>
                </Link>
                <DeleteProduct
                  productId={coupon.id}
                  productName={coupon.coupon}
                />
              </td>
            </tr>
          ))}
          {coupons.length === 0 && (
            <tr>
              <td colSpan={3} className="p-10 text-center">
                No Coupons
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
