import "server-only";

import type {
  InsertProduct,
  InsertProductVariant,
  Product,
} from "@/shared/types/product";
import { slugify } from "@/shared/utils";
import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
import { uploadFile } from "@/lib/storage";

export type InsertProductArg = Omit<
  InsertProduct,
  "slug" | "variantSequence" | "image"
> & {
  variants: (Omit<InsertProductVariant, "image" | "product_id"> & {
    image?: File;
  })[];
  image?: File;
};

export const insertProduct = async (
  productWithVariants: InsertProductArg
): Promise<Product> => {
  const { variants, ...product } = productWithVariants;
  const slug = slugify(product.title);

  const supabase = createClient(cookies());

  const image = product.image && (await uploadFile(product.image, slug));

  const { data: insertProductData, error: insertProductError } = await supabase
    .from("product")
    .insert({ ...product, slug, variant_seq: "", image })
    .select();

  if (!insertProductData || insertProductData.length === 0) {
    console.log(insertProductError);
    throw Error("Unable to create product");
  }

  const newProduct = insertProductData[0];

  const preparedVariants = await prepareVariants(variants, newProduct);

  const { data: newVariants, error: insertVariantError } = await supabase
    .from("product_variant")
    .insert(preparedVariants)
    .select();

  if (!newVariants || newVariants.length === 0) {
    console.log(insertVariantError);
    throw Error("Unable to create product variants");
  }

  const variantSequence = JSON.stringify(newVariants.map((v) => v.id));

  const { error: updateVariantSequenceError } = await supabase
    .from("product")
    .update({ variant_seq: variantSequence })
    .eq("id", newProduct.id);

  if (updateVariantSequenceError) {
    console.log(updateVariantSequenceError);
    throw Error("Unable to update variants in product");
  }

  return { ...newProduct, variants: newVariants };
};

export const prepareVariants = async (
  variants: InsertProductArg["variants"],
  product: Product
) => {
  return Promise.all(
    variants.map(async (variant, index) => {
      const slug = slugify(`${product.title} ${variant.title} ${index + 1}`);
      const image = variant.image && (await uploadFile(variant.image, slug));

      return { ...variant, image, product_id: product.id };
    })
  );
};
