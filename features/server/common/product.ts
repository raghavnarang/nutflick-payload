import "server-only";

import { getPublicUrlFromPath } from "@/lib/storage";
import { createClient } from "@/lib/supabase/static";

export const fetchProductsForGrid = async () => {
  const sbClient = createClient();
  const { data: products, error: productsError } = await sbClient
    .from("product")
    .select(
      `id, image, title, slug, category:product_category(name) ,variants:product_variant(id, title, price, comparePrice:compare_price, image, slug)`
    );

  if (productsError || !products) {
    const errMsg = "Unable to fetch products";
    console.log(productsError || errMsg);
    throw Error(errMsg);
  }

  return await Promise.all(
    products.map(async (p) => ({
      ...p,
      image: p.image && (await getPublicUrlFromPath(p.image, sbClient)),
      variants: await Promise.all(
        p.variants.map(async (v) => ({
          ...v,
          image: v.image && (await getPublicUrlFromPath(v.image, sbClient)),
        }))
      ),
    }))
  );
};

export const fetchRecommendedProducts = async (
  categoryId: number,
  productId: number
) => {
  const sbClient = createClient();
  const { data: products, error: productsError } = await sbClient
    .from("product")
    .select(
      `id, image, title, slug, category:product_category(name) ,variants:product_variant(id, title, price, comparePrice:compare_price, image, slug)`
    )
    .eq("category_id", categoryId)
    .neq("id", productId);

  if (productsError || !products) {
    const errMsg = "Unable to fetch recommended products";
    console.log(productsError || errMsg);
    throw Error(errMsg);
  }

  return await Promise.all(
    products.map(async (p) => ({
      ...p,
      image: p.image && (await getPublicUrlFromPath(p.image, sbClient)),
      variants: await Promise.all(
        p.variants.map(async (v) => ({
          ...v,
          image: v.image && (await getPublicUrlFromPath(v.image, sbClient)),
        }))
      ),
    }))
  );
};
