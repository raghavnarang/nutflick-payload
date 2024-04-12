import { z } from "zod";
import { zfd } from "zod-form-data";

export const addProductSchema = zfd.formData({
  title: zfd.text(),
  description: zfd.text(z.string().optional()),
  image: zfd.file(z.instanceof(File).optional()),
  category_id: zfd.numeric(z.number().optional()),
  variants: zfd.repeatable(
    z
      .array(
        z.object({
          title: zfd.text(),
          image: zfd.file(z.instanceof(File).optional()),
          weight: zfd.numeric(),
          price: zfd.numeric(),
          compare_price: zfd.numeric(z.number().optional()),
          included_shipping_cost: zfd.numeric(z.number().optional()),
        })
      )
      .min(1)
  ),
});

export const editProductSchema = zfd.formData({
  id: zfd.numeric(),
  title: zfd.text(),
  description: zfd.text(z.string().optional()),
  image: zfd.file(z.instanceof(File).optional()),
  category_id: zfd.numeric(z.number().optional()),
  deleted_variants: zfd.repeatable(
    z.array(
      z
        .string()
        .transform((v) => +v)
        .pipe(z.number())
    )
  ),
  variants: zfd.repeatable(
    z
      .array(
        z.object({
          id: zfd.numeric(z.number().optional()),
          title: zfd.text(),
          image: zfd.file(z.instanceof(File).optional()),
          weight: zfd.numeric(),
          price: zfd.numeric(),
          compare_price: zfd.numeric(z.number().optional()),
          included_shipping_cost: zfd.numeric(z.number().optional()),
        })
      )
      .min(1)
  ),
});
