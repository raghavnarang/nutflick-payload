"use server";

import { Status } from "@/shared/types/status";
import { z } from "zod";
import { zfd } from "zod-form-data";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export const AddProduct = (prevState: any, data: FormData) => {
  // const schema = zfd.formData({
  //   title: zfd.text(),
  //   description: zfd.text(z.string().optional()),
  //   image: zfd.file(z.instanceof(File).optional()),
  //   variant: zfd.repeatable(
  //     z.array(
  //       z.object({
  //         title: zfd.text(),
  //         image: zfd.file(z.instanceof(File).optional()),
  //         weight: zfd.numeric(),
  //         price: zfd.numeric(),
  //         comparePrice: zfd.numeric(z.number().optional()),
  //         includedShippingCost: zfd.numeric(z.number().optional()),
  //       })
  //     )
  //   ),
  // });

  // const result = schema.safeParse(data);
  // if (!result.success) {
  //   return { status: Status.error, message: "Something went wrong" };
  // }

  // const productData = result.data;
  // const slug = slugify(productData.title);
  // prisma.product.create({...product})

  //   prisma?.product.create({data: productWithVariants})
  
};
