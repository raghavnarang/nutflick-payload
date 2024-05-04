import "server-only";
import { getServiceableCouriers } from "./api";
import { ShippingCourier, ShippingMode } from "@/shared/types/shipping";
import { Status } from "@/shared/types/status";

const defaultShippingItem = {
  name: "Default",
  mode: ShippingMode.SURFACE,
  estDays: 0,
  rate: +process.env.SHIPPING_DEFAULT_CHARGES!,
};
const nonPrefCourierNames = (
  process.env.SHIPPING_EXCLUDE_PROVIDERS || ""
).split(",");
const prefCourierNames = (process.env.SHIPPING_PREFERRED_PROVIDERS || "").split(
  ","
);

const maxRateCourier = {
  name: "",
  rate: 999999,
  mode: ShippingMode.SURFACE,
  estDays: 0,
};

const adjustShippingRates = (
  items: ShippingCourier[],
  excludeShippingCharges: number
) => {
  return items.map((i) => ({
    ...i,
    rate:
      i.rate <= excludeShippingCharges ? 0 : i.rate - excludeShippingCharges,
    compareRate: i.rate,
  }));
};

export const getOrderShippingItems = async (
  from: string,
  to: string,
  weight: number,
  excludeShippingCharges: number
) => {
  let couriers: ShippingCourier[] = [];
  const defaultAdjustedCouriers = adjustShippingRates(
    [defaultShippingItem],
    excludeShippingCharges
  );

  try {
    couriers = await getServiceableCouriers(from, to, weight);
  } catch (e) {
    return {
      message:
        typeof e === "string"
          ? e
          : "Something went wrong with calculating Shipping charges, Make sure the picode is correct",
      status: Status.error,
      couriers: defaultAdjustedCouriers,
    };
  }

  if (!couriers || couriers.length === 0) {
    return {
      message: "Success",
      status: Status.success,
      couriers: defaultAdjustedCouriers,
    };
  }

  let surfaceCouriers = couriers.filter((c) => c.mode === ShippingMode.SURFACE);
  let airCouriers = couriers.filter((c) => c.mode === ShippingMode.AIR);

  /** Exclude Non Preferred Couriers and retain Preferred Couriers */
  const prefAirCouriers = airCouriers.filter(
    (c) =>
      !nonPrefCourierNames.some((npc) => c.name.includes(npc)) &&
      prefCourierNames.some((pc) => c.name.includes(pc))
  );

  const prefSurfaceCouriers = surfaceCouriers.filter(
    (c) =>
      !nonPrefCourierNames.some((npc) => c.name.includes(npc)) &&
      prefCourierNames.some((pc) => c.name.includes(pc))
  );

  /** If there not any preferred, then use rest of the couriers */
  surfaceCouriers =
    prefSurfaceCouriers.length === 0 ? surfaceCouriers : prefSurfaceCouriers;
  airCouriers = prefAirCouriers.length === 0 ? airCouriers : prefAirCouriers;

  /** Find the eligible couriers whichever has the lowest rate */
  let eligibleCouriers: ShippingCourier[] = [];
  if (surfaceCouriers.length === 0 && airCouriers.length === 0) {
    return {
      message: "Success",
      status: Status.success,
      couriers: defaultAdjustedCouriers,
    };
  } else if (surfaceCouriers.length !== 0 && airCouriers.length === 0) {
    eligibleCouriers = [
      surfaceCouriers.reduce(
        (carry, item) => (item.rate < carry.rate ? item : carry),
        maxRateCourier
      ),
    ];
  } else if (surfaceCouriers.length === 0 && airCouriers.length !== 0) {
    eligibleCouriers = [
      airCouriers.reduce(
        (carry, item) => (item.rate < carry.rate ? item : carry),
        maxRateCourier
      ),
    ];
  } else {
    eligibleCouriers = [
      surfaceCouriers.reduce(
        (carry, item) => (item.rate < carry.rate ? item : carry),
        maxRateCourier
      ),
      airCouriers.reduce(
        (carry, item) => (item.rate < carry.rate ? item : carry),
        maxRateCourier
      ),
    ];
  }

  /** Exclude the shipping cost that we can bear */
  return {
    message: "Success",
    status: Status.success,
    couriers: adjustShippingRates(eligibleCouriers, excludeShippingCharges),
  };
};
