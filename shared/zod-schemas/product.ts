import { z } from "zod";
import { zfd } from "zod-form-data";

export const addProductSchema = zfd.formData({
  title: zfd.text(),
  description: zfd.text(z.string().optional()),
  image: zfd.file(z.instanceof(File).optional()),
  variants: zfd.repeatable(
    z.array(
      z.object({
        title: zfd.text(),
        image: zfd.file(z.instanceof(File).optional()),
        weight: zfd.numeric(),
        price: zfd.numeric(),
        compare_price: zfd.numeric(z.number().optional()),
        included_shipping_cost: zfd.numeric(z.number().optional()),
      })
    )
  ),
});
