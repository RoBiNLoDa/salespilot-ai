export interface ProductUpdate {
  sku: string;
  name: string;
  description: string | null;

  price: number;
  cost: number;

  stock: number;
  active: boolean;
}
