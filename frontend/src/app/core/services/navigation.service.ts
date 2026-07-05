import { Injectable } from '@angular/core';
import { NavigationItem } from '@core/models/navigation-item';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  readonly items: NavigationItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      label: 'Clientes',
      icon: 'groups',
      route: '/customers',
    },
    {
      label: 'Productos',
      icon: 'inventory_2',
      route: '/products',
    },
    {
      label: 'Cotizaciones',
      icon: 'description',
      route: '/quotes',
    },
    {
      label: 'Reportes',
      icon: 'bar_chart',
      route: '/reports',
    },
    {
      label: 'Asistente IA',
      icon: 'smart_toy',
      route: '/assistant',
    },
  ];
}
