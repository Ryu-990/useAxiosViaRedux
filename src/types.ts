// types.ts
export interface Product {
    id?: number;
    name: string;
    category: string;
    price: number;
    [key: string]: any;
  }

  export interface Supplier {
    id: number;
    name: string;
    city: string;
    products: number[];
}