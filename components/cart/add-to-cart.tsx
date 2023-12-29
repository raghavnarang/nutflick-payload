"use client";

import { type FC } from "react";
import cx from "classnames";
import Cart from "../Icons/cart";
import Button from "../button";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import useToastWithServerPromise from "@/features/toast/hooks/use-toast-with-server-promise";
import { getImage, getVariantTitle } from "@/shared/utils/product";
import { addItem } from "./actions";

export interface AddToCartProps {
  bigButton?: boolean;
  product: Product;
  variant: ProductVariant;
}

const AddToCart: FC<AddToCartProps> = ({
  bigButton = false,
  product,
  variant,
}) => {
  const minimalProduct = {
    image: getImage(product, variant),
    title: getVariantTitle(product, variant),
  };

  const [pending, addToCart] = useToastWithServerPromise(
    () => addItem(variant.id),
    "Adding to cart",
    minimalProduct
  );

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        addToCart();
      }}
    >
      <Button
        disabled={pending}
        className={cx({ "!w-1/2 mt-10": bigButton })}
        isIcon={!bigButton}
      >
        {bigButton ? "Add to Cart" : <Cart />}
      </Button>
    </form>
  );
};

export default AddToCart;
