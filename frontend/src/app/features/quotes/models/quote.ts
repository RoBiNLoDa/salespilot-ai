import { QuoteItem } from './quote-item';
import { QuoteStatus } from './quote-status';

export interface Quote {
  id: number;
  quoteNumber: string;
  customerId: number;

  issueDate: string;
  expirationDate: string;

  status: QuoteStatus;

  notes: string | null;

  items: QuoteItem[];

  createdAt: string;
  updatedAt: string;
}
