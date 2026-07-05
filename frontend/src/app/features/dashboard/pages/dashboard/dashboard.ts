import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardStat } from '@core/models/dashboard-stat';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  stats: DashboardStat[] = [
  {
    title: 'Clientes',
    icon: 'groups',
    value: 152
  },
  {
    title: 'Productos',
    icon: 'inventory_2',
    value: 820
  },
  {
    title: 'Cotizaciones',
    icon: 'description',
    value: 31
  },
  {
    title: 'Ventas',
    icon: 'payments',
    value: '$23.000'
  }
];

}
