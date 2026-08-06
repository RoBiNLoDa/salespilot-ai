import { ProductSummary } from "@features/products/models/product-summary";

export interface QuoteItem {
  id: number;

  quoteId: number;
  productId: number;
  product: ProductSummary;
  quantity: number;

  unitPrice: number;

  discount: number;

  createdAt: string;
  updatedAt: string;
}
