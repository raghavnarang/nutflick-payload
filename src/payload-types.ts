/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
    customers: CustomerAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    products: Product;
    categories: Category;
    customers: Customer;
    addresses: Address;
    coupons: Coupon;
    orders: Order;
    pages: Page;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    products: ProductsSelect<false> | ProductsSelect<true>;
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    customers: CustomersSelect<false> | CustomersSelect<true>;
    addresses: AddressesSelect<false> | AddressesSelect<true>;
    coupons: CouponsSelect<false> | CouponsSelect<true>;
    orders: OrdersSelect<false> | OrdersSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'shipping-options': ShippingOption;
    'home-page-options': HomePageOption;
    'header-settings': HeaderSetting;
    gst: Gst;
  };
  globalsSelect: {
    'shipping-options': ShippingOptionsSelect<false> | ShippingOptionsSelect<true>;
    'home-page-options': HomePageOptionsSelect<false> | HomePageOptionsSelect<true>;
    'header-settings': HeaderSettingsSelect<false> | HeaderSettingsSelect<true>;
    gst: GstSelect<false> | GstSelect<true>;
  };
  locale: null;
  user:
    | (User & {
        collection: 'users';
      })
    | (Customer & {
        collection: 'customers';
      });
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
export interface CustomerAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: number;
  slug: string;
  title: string;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  description_html?: string | null;
  category?: {
    relationTo: 'categories';
    value: number | Category;
  } | null;
  image: number | Media;
  bigImage?: (number | null) | Media;
  variants?:
    | {
        title: string;
        weight: number;
        price: number;
        comparePrice?: number | null;
        includedShippingCost?: number | null;
        slug: string;
        image?: (number | null) | Media;
        bigImage?: (number | null) | Media;
        id?: string | null;
      }[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "customers".
 */
export interface Customer {
  id: number;
  preferredAddress?: (number | null) | Address;
  pendingOrder?: (number | null) | Order;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "addresses".
 */
export interface Address {
  id: number;
  customer: number | Customer;
  name: string;
  address: string;
  phone: string;
  city: string;
  state:
    | 'AN'
    | 'AP'
    | 'AR'
    | 'AS'
    | 'BR'
    | 'CG'
    | 'CH'
    | 'DN'
    | 'DD'
    | 'DL'
    | 'GA'
    | 'GJ'
    | 'HR'
    | 'HP'
    | 'JK'
    | 'JH'
    | 'KA'
    | 'KL'
    | 'LA'
    | 'LD'
    | 'MP'
    | 'MH'
    | 'MN'
    | 'ML'
    | 'MZ'
    | 'NL'
    | 'OR'
    | 'PY'
    | 'PB'
    | 'RJ'
    | 'SK'
    | 'TN'
    | 'TS'
    | 'TR'
    | 'UP'
    | 'UK'
    | 'WB';
  pincode: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: number;
  customer: number | Customer;
  addressRef?: (number | null) | Address;
  name: string;
  address: string;
  phone: string;
  city: string;
  state:
    | 'AN'
    | 'AP'
    | 'AR'
    | 'AS'
    | 'BR'
    | 'CG'
    | 'CH'
    | 'DN'
    | 'DD'
    | 'DL'
    | 'GA'
    | 'GJ'
    | 'HR'
    | 'HP'
    | 'JK'
    | 'JH'
    | 'KA'
    | 'KL'
    | 'LA'
    | 'LD'
    | 'MP'
    | 'MH'
    | 'MN'
    | 'ML'
    | 'MZ'
    | 'NL'
    | 'OR'
    | 'PY'
    | 'PB'
    | 'RJ'
    | 'SK'
    | 'TN'
    | 'TS'
    | 'TR'
    | 'UP'
    | 'UK'
    | 'WB';
  pincode: string;
  products: {
    productRef?: (number | null) | Product;
    variantId: string;
    title: string;
    qty: number;
    price: number;
    weight: number;
    includedShippingCost?: number | null;
    gstRate?: number | null;
    id?: string | null;
  }[];
  afterOrder?: {
    trackLink?: string | null;
    status?: ('processing' | 'shipped' | 'completed') | null;
  };
  couponRef?: (number | null) | Coupon;
  coupon?: string | null;
  discount?: number | null;
  mode?: string | null;
  rate?: number | null;
  razorpay?: {
    orderId?: string | null;
    paymentId?: string | null;
    signature?: string | null;
    total?: number | null;
  };
  gstState?:
    | (
        | 'AN'
        | 'AP'
        | 'AR'
        | 'AS'
        | 'BR'
        | 'CG'
        | 'CH'
        | 'DN'
        | 'DD'
        | 'DL'
        | 'GA'
        | 'GJ'
        | 'HR'
        | 'HP'
        | 'JK'
        | 'JH'
        | 'KA'
        | 'KL'
        | 'LA'
        | 'LD'
        | 'MP'
        | 'MH'
        | 'MN'
        | 'ML'
        | 'MZ'
        | 'NL'
        | 'OR'
        | 'PY'
        | 'PB'
        | 'RJ'
        | 'SK'
        | 'TN'
        | 'TS'
        | 'TR'
        | 'UP'
        | 'UK'
        | 'WB'
      )
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "coupons".
 */
export interface Coupon {
  id: number;
  is_active?: boolean | null;
  coupon: string;
  value: number;
  type: 'fixed' | 'percent';
  min_cart_value?: number | null;
  max_discount?: number | null;
  is_infinite: '1' | '0';
  max_use?: number | null;
  checkout_visible?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  slug: string;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  content_html?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'products';
        value: number | Product;
      } | null)
    | ({
        relationTo: 'categories';
        value: number | Category;
      } | null)
    | ({
        relationTo: 'customers';
        value: number | Customer;
      } | null)
    | ({
        relationTo: 'addresses';
        value: number | Address;
      } | null)
    | ({
        relationTo: 'coupons';
        value: number | Coupon;
      } | null)
    | ({
        relationTo: 'orders';
        value: number | Order;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null);
  globalSlug?: string | null;
  user:
    | {
        relationTo: 'users';
        value: number | User;
      }
    | {
        relationTo: 'customers';
        value: number | Customer;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user:
    | {
        relationTo: 'users';
        value: number | User;
      }
    | {
        relationTo: 'customers';
        value: number | Customer;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products_select".
 */
export interface ProductsSelect<T extends boolean = true> {
  slug?: T;
  title?: T;
  description?: T;
  description_html?: T;
  category?: T;
  image?: T;
  bigImage?: T;
  variants?:
    | T
    | {
        title?: T;
        weight?: T;
        price?: T;
        comparePrice?: T;
        includedShippingCost?: T;
        slug?: T;
        image?: T;
        bigImage?: T;
        id?: T;
      };
  meta?:
    | T
    | {
        overview?: T;
        title?: T;
        description?: T;
        image?: T;
        preview?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "customers_select".
 */
export interface CustomersSelect<T extends boolean = true> {
  preferredAddress?: T;
  pendingOrder?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  _verified?: T;
  _verificationToken?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "addresses_select".
 */
export interface AddressesSelect<T extends boolean = true> {
  customer?: T;
  name?: T;
  address?: T;
  phone?: T;
  city?: T;
  state?: T;
  pincode?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "coupons_select".
 */
export interface CouponsSelect<T extends boolean = true> {
  is_active?: T;
  coupon?: T;
  value?: T;
  type?: T;
  min_cart_value?: T;
  max_discount?: T;
  is_infinite?: T;
  max_use?: T;
  checkout_visible?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders_select".
 */
export interface OrdersSelect<T extends boolean = true> {
  customer?: T;
  addressRef?: T;
  name?: T;
  address?: T;
  phone?: T;
  city?: T;
  state?: T;
  pincode?: T;
  products?:
    | T
    | {
        productRef?: T;
        variantId?: T;
        title?: T;
        qty?: T;
        price?: T;
        weight?: T;
        includedShippingCost?: T;
        gstRate?: T;
        id?: T;
      };
  afterOrder?:
    | T
    | {
        trackLink?: T;
        status?: T;
      };
  couponRef?: T;
  coupon?: T;
  discount?: T;
  mode?: T;
  rate?: T;
  razorpay?:
    | T
    | {
        orderId?: T;
        paymentId?: T;
        signature?: T;
        total?: T;
      };
  gstState?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  content?: T;
  content_html?: T;
  meta?:
    | T
    | {
        overview?: T;
        title?: T;
        description?: T;
        image?: T;
        preview?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "shipping-options".
 */
export interface ShippingOption {
  id: number;
  freeShippingSettings: {
    enable?: boolean | null;
    subtotal: number;
  };
  option: {
    mode: string;
    days?: number | null;
    rates: {
      rate: number;
      weight: number;
      id?: string | null;
    }[];
    id?: string | null;
  }[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home-page-options".
 */
export interface HomePageOption {
  id: number;
  pageBlocks?:
    | (
        | {
            product: number | Product;
            titleLeft: string;
            titleRight: string;
            tag: string;
            description: string;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Hero';
          }
        | {
            products: (number | Product)[];
            title: string;
            subtitle: string;
            id?: string | null;
            blockName?: string | null;
            blockType: 'Products';
          }
        | {
            id?: string | null;
            blockName?: string | null;
            blockType: 'SyncCart';
          }
        | BrandFeatures
      )[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BrandFeatures".
 */
export interface BrandFeatures {
  title?: string | null;
  subtitle?: string | null;
  features?:
    | {
        text?: string | null;
        image?: (number | null) | Media;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'BrandFeatures';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header-settings".
 */
export interface HeaderSetting {
  id: number;
  messageStrip?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gst".
 */
export interface Gst {
  id: number;
  state:
    | 'AN'
    | 'AP'
    | 'AR'
    | 'AS'
    | 'BR'
    | 'CG'
    | 'CH'
    | 'DN'
    | 'DD'
    | 'DL'
    | 'GA'
    | 'GJ'
    | 'HR'
    | 'HP'
    | 'JK'
    | 'JH'
    | 'KA'
    | 'KL'
    | 'LA'
    | 'LD'
    | 'MP'
    | 'MH'
    | 'MN'
    | 'ML'
    | 'MZ'
    | 'NL'
    | 'OR'
    | 'PY'
    | 'PB'
    | 'RJ'
    | 'SK'
    | 'TN'
    | 'TS'
    | 'TR'
    | 'UP'
    | 'UK'
    | 'WB';
  categoryGSTSets?:
    | {
        rate: number;
        category: (number | Category)[];
        id?: string | null;
      }[]
    | null;
  restGSTSet: {
    rate: number;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "shipping-options_select".
 */
export interface ShippingOptionsSelect<T extends boolean = true> {
  freeShippingSettings?:
    | T
    | {
        enable?: T;
        subtotal?: T;
      };
  option?:
    | T
    | {
        mode?: T;
        days?: T;
        rates?:
          | T
          | {
              rate?: T;
              weight?: T;
              id?: T;
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home-page-options_select".
 */
export interface HomePageOptionsSelect<T extends boolean = true> {
  pageBlocks?:
    | T
    | {
        Hero?:
          | T
          | {
              product?: T;
              titleLeft?: T;
              titleRight?: T;
              tag?: T;
              description?: T;
              id?: T;
              blockName?: T;
            };
        Products?:
          | T
          | {
              products?: T;
              title?: T;
              subtitle?: T;
              id?: T;
              blockName?: T;
            };
        SyncCart?:
          | T
          | {
              id?: T;
              blockName?: T;
            };
        BrandFeatures?:
          | T
          | {
              title?: T;
              subtitle?: T;
              features?:
                | T
                | {
                    text?: T;
                    image?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
      };
  meta?:
    | T
    | {
        overview?: T;
        title?: T;
        description?: T;
        image?: T;
        preview?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header-settings_select".
 */
export interface HeaderSettingsSelect<T extends boolean = true> {
  messageStrip?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gst_select".
 */
export interface GstSelect<T extends boolean = true> {
  state?: T;
  categoryGSTSets?:
    | T
    | {
        rate?: T;
        category?: T;
        id?: T;
      };
  restGSTSet?:
    | T
    | {
        rate?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}