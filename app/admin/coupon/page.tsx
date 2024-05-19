import { Plus } from "@/components/Icons";
import Edit from "@/components/Icons/edit";
import CouponToggleActivationListItem from "@/components/admin/coupon/toggle-activation-list-item";
import Button from "@/components/button";
import { getCoupons } from "@/features/server/admin/coupon";
import Link from "next/link";
import cx from "classnames";
import DeleteCoupon from "@/components/admin/coupon/delete";
import { CouponValueType } from "@/shared/types/coupon";
import Price from "@/components/product/price";

const SignalStatus = ({ isActive }: { isActive: boolean }) => (
  <span
    className={cx("rounded-full size-3 inline-block mr-2", {
      "bg-green-500": isActive,
      "bg-red-500": !isActive,
    })}
  />
);

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
            <th className="py-2 px-4">Is Active</th>
            <th className="py-2 px-4">Is Visible on Checkout</th>
            <th className="py-2 px-4">Value</th>
            <th className="py-2 px-4">No. of Usages</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id} className="border-b">
              <td className="py-2 px-4">{coupon.id}</td>
              <td className="py-2 px-4">
                <Link
                  href={`/admin/coupon/${coupon.id}`}
                  className="border-b border-gray-200 hover:border-gray-500"
                >
                  {coupon.coupon}
                </Link>
              </td>
              <td className="py-2 px-4">
                <SignalStatus isActive={coupon.is_active} />
              </td>
              <td className="py-2 px-4">
                <SignalStatus isActive={coupon.checkout_visible || false} />
              </td>
              <td className="py-2 px-4">
                {coupon.value_type === CouponValueType.FIXED ? (
                  <Price price={coupon.value} />
                ) : (
                  coupon.value + "%"
                )}
                {coupon.max_discount && (
                  <p className="italic text-sm text-gray-500">
                    (Max Discount: <Price price={coupon.max_discount} />)
                  </p>
                )}
                {coupon.min_cart_value && (
                  <p className="italic text-sm text-gray-500">
                    (Minimum Cart: <Price price={coupon.min_cart_value} />)
                  </p>
                )}
              </td>
              <td className="py-2 px-4">
                {coupon.max_use ? `${coupon.max_use} times` : "∞"}
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
                <DeleteCoupon id={coupon.id} couponName={coupon.coupon} />
              </td>
            </tr>
          ))}
          {coupons.length === 0 && (
            <tr>
              <td colSpan={7} className="p-10 text-center">
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
