import { environment } from '@environments/environment';

export const APP_SETTINGS = {
  name: 'SalesPilot AI',
  version: '0.1.0',

  company: 'Robinson Loaiza',

  supportEmail: 'support@salespilot.ai',

  pagination: {
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
  },
} as const;

export const API = {
  auth: `${environment.apiUrl}/auth`,
  customers: `${environment.apiUrl}/customers`,
  products: `${environment.apiUrl}/products`,
  quotes: `${environment.apiUrl}/quotes`,
  quoteItems: `${environment.apiUrl}/quote-items`,
} as const;
