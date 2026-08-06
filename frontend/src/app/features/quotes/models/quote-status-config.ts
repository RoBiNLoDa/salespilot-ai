import { QuoteStatus } from '../models/quote-status';
import { StatusChipConfig } from '../../../shared/models/status-chip-config';

export const QUOTE_STATUS_CONFIG: Record<QuoteStatus, StatusChipConfig> = {
  [QuoteStatus.DRAFT]: {
    label: 'Borrador',
    icon: 'edit_note',
    class: 'status-draft',
  },

  [QuoteStatus.SENT]: {
    label: 'Enviada',
    icon: 'send',
    class: 'status-sent',
  },

  [QuoteStatus.ACCEPTED]: {
    label: 'Aprobada',
    icon: 'check_circle',
    class: 'status-accepted',
  },

  [QuoteStatus.REJECTED]: {
    label: 'Rechazada',
    icon: 'cancel',
    class: 'status-rejected',
  },

  [QuoteStatus.EXPIRED]: {
    label: 'Expirada',
    icon: 'schedule',
    class: 'status-expired',
  },
};
