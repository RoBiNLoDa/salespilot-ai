export interface QuoteCreate {
  customerId: number;

  issueDate: string;
  expirationDate: string;

  notes?: string;
}
