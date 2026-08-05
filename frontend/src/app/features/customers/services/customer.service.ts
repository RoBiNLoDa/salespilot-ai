import { Injectable } from '@angular/core';

import { Customer } from '../models/customer';
import { CustomerCreate } from '../models/customer-create';
import { CustomerUpdate } from '../models/customer-update';
import { API } from '@core/config/application.config';
import { CrudService } from '@core/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends CrudService<Customer, CustomerCreate, CustomerUpdate> {
  protected override apiUrl: string = API.customers;
}
