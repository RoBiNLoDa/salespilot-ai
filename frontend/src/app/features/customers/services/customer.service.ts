import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly customers: Customer[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Pérez',
      company: 'ACME',
      email: 'juan@acme.com',
      phone: '3001234567',
      city: 'Bogotá',
      active: true
    },
    {
      id: 2,
      firstName: 'María',
      lastName: 'Gómez',
      company: 'Globant',
      email: 'maria@globant.com',
      phone: '3009876543',
      city: 'Medellín',
      active: true
    },
    {
      id: 3,
      firstName: 'Carlos',
      lastName: 'Ruiz',
      company: 'Microsoft',
      email: 'carlos@microsoft.com',
      phone: '3014567890',
      city: 'Cali',
      active: true
    }
  ];

  getAll(): Observable<Customer[]> {
    return of(this.customers);
  }

}