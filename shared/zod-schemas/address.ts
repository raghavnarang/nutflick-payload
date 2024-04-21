import { z } from "zod";
import { zfd } from "zod-form-data";
import states from "@/lib/states.json";

const statesArray = Object.values(states);

export const addAddressSchema = zfd.formData({
  name: zfd.text(),
  phone: zfd
    .numeric(z.number().min(6000000000).max(9999999999))
    .transform((val) => val.toString()),
  address: zfd.text(),
  pincode: zfd
    .numeric(z.number().max(999999))
    .transform((val) => val.toString()),
  city: zfd.text(),
  state: zfd.text(z.enum([statesArray[0], ...statesArray])),
});

export const updateAddressSchema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(z.string().optional()),
  phone: zfd
    .numeric(z.number().min(6000000000).max(9999999999).optional())
    .transform((val) => val?.toString()),
  address: zfd.text(z.string().optional()),
  pincode: zfd
    .numeric(z.number().max(999999).optional())
    .transform((val) => val?.toString()),
  city: zfd.text(z.string().optional()),
  state: zfd.text(z.enum([statesArray[0], ...statesArray]).optional()),
});
