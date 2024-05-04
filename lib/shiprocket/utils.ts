import "server-only";
import { ShippingCourier, ShippingMode } from "@/shared/types/shipping";

export const getCourierProvidersFromApiResponse = (response: any) => {
  const couriers = response?.data?.available_courier_companies;
  if (!Array.isArray(couriers) || couriers.length === 0) {
    if(response?.message) {
      throw response.message;
    }

    return [];
  }
  return couriers
    .filter((c) => c && c.courier_name && c.rate && c.estimated_delivery_days)
    .map((c) => ({
      name: c.courier_name,
      rate: +c.rate,
      estDays: +c.estimated_delivery_days,
      mode: !!c.mode ? ShippingMode.AIR : ShippingMode.SURFACE,
    })) as ShippingCourier[];
};
