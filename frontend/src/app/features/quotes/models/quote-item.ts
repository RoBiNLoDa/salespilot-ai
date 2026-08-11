import { ProductSummary } from '@features/products/models/product-summary';
import { QuoteItemTotals } from './quote-item-totals';

export interface QuoteItem {
  id: number;
  quoteId: number;
  productId: number;

  product: ProductSummary;

  quantity: number;
  unitPrice: number;
  discount: number;

  totals: QuoteItemTotals;

  createdAt: string;
  updatedAt: string;
}
