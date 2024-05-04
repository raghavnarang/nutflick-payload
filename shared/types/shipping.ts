export enum ShippingMode {
  SURFACE = "surface",
  AIR = "air",
}

export interface ShippingCourier {
  name: string;
  mode: ShippingMode;
  estDays: number;
  rate: number;
  compareRate?: number;
}
