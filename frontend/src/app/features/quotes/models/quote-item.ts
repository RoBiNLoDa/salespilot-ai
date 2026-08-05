export interface QuoteItem {
  id: number;

  quoteId: number;
  productId: number;

  quantity: number;

  unitPrice: number;

  discount: number;

  createdAt: string;
  updatedAt: string;
}
