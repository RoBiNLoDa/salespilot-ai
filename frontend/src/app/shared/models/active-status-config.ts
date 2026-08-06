import { StatusChipConfig } from './status-chip-config';

export const ACTIVE_STATUS_CONFIG: Record<string, StatusChipConfig> = {
  ACTIVE: {
    label: 'Activo',
    icon: 'check_circle',
    class: 'status-active',
  },

  INACTIVE: {
    label: 'Inactivo',
    icon: 'cancel',
    class: 'status-inactive',
  },
};
