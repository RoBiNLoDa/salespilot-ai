import { CustomerSummary } from '@features/customers/models/customer-summary';
import { QuoteItem } from './quote-item';
import { QuoteStatus } from './quote-status';

export interface Quote {
  id: number;
  quoteNumber: string;
  customerId: number;
  customer: CustomerSummary;
  issueDate: string;
  expirationDate: string;

  status: QuoteStatus;

  notes: string | null;

  items: QuoteItem[];

  createdAt: string;
  updatedAt: string;
}
