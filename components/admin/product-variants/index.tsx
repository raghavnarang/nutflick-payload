"use client";

import Button from "@/components/button";
import { Plus } from "@/components/Icons";
import Variant from "./variant";
import { type MouseEventHandler, useState, FC } from "react";
import { ProductVariant } from "@/shared/types/product";

interface ProductVariantsProps {
  editVariants?: ProductVariant[];
}

const ProductVariants: FC<ProductVariantsProps> = ({ editVariants }) => {
  const [variants, setVariants] = useState(
    editVariants ? Array.from(Array(editVariants.length).keys()) : [0]
  );

  const addVariant: MouseEventHandler = (e) => {
    e.preventDefault();
    const newVariantKey = Math.max(...variants) + 1;
    setVariants([...variants, newVariantKey]);
  };

  const deleteVariant = (variant: number) => {
    setVariants(variants.filter((v) => v !== variant));
  };

  const moveVariant = (index: number, direction: "up" | "down") => {
    const newArray = [...variants];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newArray[swapIndex], newArray[index]] = [
      variants[index],
      variants[swapIndex],
    ];
    setVariants(newArray);
  };

  return (
    <div>
      {variants.map((variant, index) => (
        <Variant
          name={`variants[${index}]`}
          key={variant}
          editVariant={editVariants?.[variant]}
          onDelete={
            variants.length > 1 ? () => deleteVariant(variant) : undefined
          }
          onMoveUp={index !== 0 ? () => moveVariant(index, "up") : undefined}
          onMoveDown={
            index !== variants.length - 1
              ? () => moveVariant(index, "down")
              : undefined
          }
        />
      ))}
      <Button className="!bg-blue-500 text-white" onClick={addVariant}>
        <Plus className="mr-2" />
        Add new variant
      </Button>
    </div>
  );
};

export default ProductVariants;
