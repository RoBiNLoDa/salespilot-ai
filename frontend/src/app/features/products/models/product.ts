export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string | null;

  price: number;
  cost: number;

  stock: number;
  taxRate: number;
  active: boolean;
}
