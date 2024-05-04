export enum ShippingMode {
  SURFACE = 1,
  AIR = 2,
}

export interface ShippingCourier {
  name: string;
  mode: ShippingMode;
  estDays: number;
  rate: number;
  compareRate?: number;
}
