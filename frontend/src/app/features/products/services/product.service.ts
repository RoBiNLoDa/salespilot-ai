import { Injectable } from '@angular/core';
import { API } from '@core/config/application.config';
import { CrudService } from '@core/services/crud.service';
import { Product } from '@features/products/models/product';
import { ProductCreate } from '@features/products/models/product-create';
import { ProductUpdate } from '@features/products/models/product-update';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends CrudService<Product, ProductCreate, ProductUpdate> {
  protected override apiUrl: string = API.products;
}
