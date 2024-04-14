"use client";

import { type FC } from "react";
import cx from "classnames";
import Cart from "../Icons/cart";
import Button from "../button";
import type {
  ProductGridItem,
  ProductVariantGridItem,
} from "@/shared/types/product";
import { useCart } from "@/features/cart";
import EditCartItem from "./edit-cart-item";

export interface AddToCartProps {
  product: ProductGridItem;
  variant: ProductVariantGridItem;
  showIcon?: boolean;
  bigButton?: boolean;
}

const AddToCart: FC<AddToCartProps> = ({
  product,
  variant,
  bigButton,
  showIcon,
}) => {
  const { cart, increment } = useCart();

  const cartItem = cart.items.find((ci) => ci.variantId === variant.id);
  if (cartItem) {
    return (
      <>
        {bigButton && <p className="text-lg mb-3">Quantity (in cart)</p>}
        <EditCartItem
          variantId={variant.id}
          qty={cartItem.qty}
          className={cx({ "!flex-row": !bigButton })}
          bigButton={bigButton}
        />
      </>
    );
  }

  return (
    <Button
      className={cx({ "xl:w-1/2": bigButton })}
      icon={showIcon ? Cart : undefined}
      large={bigButton}
      small={!bigButton}
      onClick={() => increment(variant, product)}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCart;
