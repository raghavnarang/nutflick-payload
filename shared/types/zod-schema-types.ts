import { z } from "zod";
import { addProductSchema, editProductSchema } from "../zod-schemas/product";

export type ProductToInsert = z.infer<typeof addProductSchema>;
export type ProductVariantToInsert = ProductToInsert["variants"][0];
export type ProductToUpdate = z.infer<typeof editProductSchema>;
export type ProductVariantToUpsert = ProductToUpdate["variants"][0];
