import "server-only";

import type {
  InsertProductVariant as PreparedProductVariantToInsert,
  Product,
  ProductVariant,
  UpdateProductVariant as PreparedProductVariantToUpdate,
} from "@/shared/types/product";
import { getUniqueSlug, slugify } from "@/shared/utils";
import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
import { getPublicUrlFromPath, uploadFile } from "@/lib/storage";
import { createServerClient } from "@supabase/ssr";
import { createClient as createStaticClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/db-schema";
import { revalidatePath } from "next/cache";
import type {
  ProductToInsert,
  ProductToUpdate,
  ProductVariantToUpsert,
} from "@/shared/types/zod-schema-types";

type SupabaseClient = ReturnType<typeof createClient>;

enum UpsertOperation {
  INSERT = 1,
  UPDATE = 2,
}

export const prepareVariant = async (
  variant: ProductVariantToUpsert,
  product: Product,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const slug = slugify(variant.title);
  const imageName = slugify(`${product.slug} ${slug}`);
  const image = await getImageForDBUpsert(variant, imageName, dbClient);

  return { ...variant, image, product_id: product.id, slug };
};

export const insertVariants = async (
  variants: PreparedProductVariantToInsert[],
  sbClient: SupabaseClient
) => {
  if (variants.length === 0) {
    return [];
  }

  const { data: newVariants, error: insertVariantError } = await sbClient
    .from("product_variant")
    .insert(variants)
    .select();

  if (!newVariants || newVariants.length === 0) {
    console.log(insertVariantError);
    throw Error("Unable to create product variants");
  }

  return newVariants;
};

export const updateVariants = async (
  variants: PreparedProductVariantToUpdate[],
  sbClient: SupabaseClient
) => {
  if (variants.length === 0) {
    return [];
  }

  const updatedVariants: ProductVariant[] = [];

  for (const variant of variants) {
    const { id, ...restVariant } = variant;
    if (!id) {
      console.log("ID is not available");
      throw Error("Input Variant data is invalid");
    }

    const { data: updatedVariant, error: updateVariantError } = await sbClient
      .from("product_variant")
      .update(restVariant)
      .eq("id", id)
      .select();

    if (!updatedVariant || updatedVariant.length === 0) {
      console.log(updateVariantError);
      throw Error("Unable to update product variant");
    }

    updatedVariants.push(updatedVariant[0]);
  }

  return updatedVariants;
};

export const updateVariantSequence = async (
  variants: ProductVariant[],
  productId: number,
  sbClient: SupabaseClient
) => {
  const variantSequence = JSON.stringify(variants.map((v) => v.id));
  const { error: updateVariantSequenceError } = await sbClient
    .from("product")
    .update({ variant_seq: variantSequence })
    .eq("id", productId);

  if (updateVariantSequenceError) {
    console.log(updateVariantSequenceError);
    throw Error("Unable to update variants in product");
  }
};

export const upsertVariants = async (
  variants: ProductVariantToUpsert[],
  product: Product,
  sbClient: SupabaseClient
) => {
  const itemOperationsByIndex: UpsertOperation[] = [];
  const variantsToInsert: PreparedProductVariantToInsert[] = [];
  const variantsToUpdate: PreparedProductVariantToUpdate[] = [];

  for (let index = 0; index < variants.length; index++) {
    const variant = variants[index];
    const preparedVariant = await prepareVariant(variant, product, sbClient);

    if (!variant.id) {
      itemOperationsByIndex.push(UpsertOperation.INSERT);
      variantsToInsert.push(preparedVariant);
    } else {
      itemOperationsByIndex.push(UpsertOperation.UPDATE);
      variantsToUpdate.push(preparedVariant);
    }
  }

  const insertedVariants = await insertVariants(variantsToInsert, sbClient);
  const updatedVariants = await updateVariants(variantsToUpdate, sbClient);

  let currentInsertedItemIndex = 0;
  let currentUpdatedItemIndex = 0;
  return itemOperationsByIndex.map((op) => {
    if (op === UpsertOperation.INSERT) {
      const item = insertedVariants[currentInsertedItemIndex];
      currentInsertedItemIndex++;
      return item;
    } else {
      const item = updatedVariants[currentUpdatedItemIndex];
      currentUpdatedItemIndex++;
      return item;
    }
  });
};

export const fetchProduct = async (
  id: number | string,
  dbClient: ReturnType<
    typeof createServerClient<Database> | typeof createStaticClient<Database>
  >
) => {
  const productsResponse = await dbClient
    .from("product")
    .select(
      "*, variants:product_variant(*), category:product_category(id, name)"
    )
    .eq(typeof id === "number" ? "id" : "slug", id);

  if (
    productsResponse.error ||
    productsResponse.count === 0 ||
    productsResponse.data[0].variants.length === 0
  ) {
    console.log("Products Fetch Error", productsResponse.error);

    throw Error("Something went wrong in fetching product");
  }

  const product = productsResponse.data[0];
  if (product.image) {
    product.image = await getPublicUrlFromPath(product.image, dbClient);
  }

  const variants = product.variants;
  const sequencedVariants: ProductVariant[] = [];
  const sequence = (
    !product.variant_seq ? null : JSON.parse(product.variant_seq as string)
  ) as number[] | null;

  if (sequence) {
    for (let index = 0; index < sequence.length; index++) {
      const variantId = sequence[index];
      const variantDbIndex = variants.findIndex((v) => v.id === variantId);
      const variant = variants[variantDbIndex];
      if (variant.image) {
        variant.image = await getPublicUrlFromPath(variant.image, dbClient);
      }
      sequencedVariants[index] = variants[variantDbIndex];
    }
  }

  return {
    ...product,
    variants: sequencedVariants,
    category_id: product.category?.id || null,
  };
};

export const getProductSlug = async (id: number, sbClient: SupabaseClient) => {
  const response = await sbClient.from("product").select("slug").eq("id", id);
  if (
    response.count === 0 ||
    !response.data?.length ||
    !response.data[0].slug
  ) {
    const err = response.error || "Unable to featch slug or is corrupted";
    console.log(err);
    throw Error("Internal Databse Error. We are on fixing it.");
  }

  return response.data[0].slug;
};

export const getImageForDBUpsert = async (
  item: { image?: File },
  slug: string,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  if (item.image) {
    return await uploadFile(item.image, slug, dbClient);
  }

  return "image" in item ? null : undefined;
};

export const insertProduct = async (
  productWithVariants: ProductToInsert
): Promise<Product> => {
  const { variants, ...product } = productWithVariants;

  const supabase = createClient(cookies());
  const slug = await getUniqueSlug(product.title, supabase);

  const image =
    product.image && (await uploadFile(product.image, slug, supabase));

  const { data: insertProductData, error: insertProductError } = await supabase
    .from("product")
    .insert({
      ...product,
      slug,
      variant_seq: "",
      image,
      category_id: product.category_id ? product.category_id : null,
    })
    .select();

  if (!insertProductData || insertProductData.length === 0) {
    console.log(insertProductError);
    throw Error("Unable to create product");
  }

  const newProduct = insertProductData[0];

  const preparedVariants = await Promise.all(
    variants.map((variant) => prepareVariant(variant, newProduct, supabase))
  );

  const newVariants = await insertVariants(preparedVariants, supabase);
  await updateVariantSequence(newVariants, newProduct.id, supabase);

  revalidatePath("/");

  return { ...newProduct, variants: newVariants };
};

export const deleteVariants = async (
  variants: number[],
  sbClient: SupabaseClient
) => {
  const { error } = await sbClient
    .from("product_variant")
    .delete()
    .in("id", variants);

  if (error) {
    console.log(error);
    throw Error("Unable to delete variants");
  }
};

export const updateProduct = async (
  productWithVariants: ProductToUpdate
): Promise<Product> => {
  const {
    variants,
    id,
    deleted_variants: variantsToDelete,
    ...product
  } = productWithVariants;
  if (!id) {
    console.log("ID is not available");
    throw Error("Input data is invalid");
  }

  const supabase = createClient(cookies());
  const slug = await getProductSlug(id, supabase);
  const image = await getImageForDBUpsert(product, slug, supabase);

  const { data: updateProductData, error: updateProductError } = await supabase
    .from("product")
    .update({
      ...product,
      image,
      category_id: product.category_id ? product.category_id : null,
    })
    .eq("id", id)
    .select();

  if (!updateProductData || updateProductData.length === 0) {
    console.log(updateProductError);
    throw Error("Unable to update product");
  }

  const updatedProduct = updateProductData[0];
  const upsertedVariants = await upsertVariants(
    variants,
    updatedProduct,
    supabase
  );
  await updateVariantSequence(upsertedVariants, updatedProduct.id, supabase);

  if (!!variantsToDelete?.length) {
    await deleteVariants(variantsToDelete, supabase);
  }

  revalidatePath("/");

  return { ...updatedProduct, variants: upsertedVariants };
};

export const fetchProducts = async () => {
  const sbClient = createClient(cookies());
  const { data: products, error } = await sbClient.from("product").select();

  if (error || !products) {
    const errMsg = "Unable to fetch products";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  return products;
};

export const deleteProduct = async (productId: number) => {
  const sbClient = createClient(cookies());
  const variantDeleteResult = await sbClient
    .from("product_variant")
    .delete()
    .eq("product_id", productId);
  const productDeleteResult = await sbClient
    .from("product")
    .delete()
    .eq("id", productId);

  if (variantDeleteResult.error || productDeleteResult.error) {
    console.log(variantDeleteResult.error || productDeleteResult.error);
    throw new Error(
      "Unable to delete product & it's variants. Data may be corrupted. Try to delete from DB directly"
    );
  }

  revalidatePath("/");
};
