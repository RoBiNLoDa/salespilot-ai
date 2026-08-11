import { CustomerSummary } from '@features/customers/models/customer-summary';
import { QuoteItem } from './quote-item';
import { QuoteStatus } from './quote-status';
import { QuoteTotals } from './quote-totals';

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

  totals: QuoteTotals;

  createdAt: string;
  updatedAt: string;
}
