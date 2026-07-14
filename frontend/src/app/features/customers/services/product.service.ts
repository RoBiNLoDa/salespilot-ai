import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Product } from '@features/products/models/product';
import { ProductCreate } from '@features/products/models/product-create';
import { ProductUpdate } from '@features/products/models/product-update';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/products`);
  }

  create(product: ProductCreate) {
    return this.http.post<Product>(`${this.api}/products`, product);
  }

  update(id: number, product: ProductUpdate): Observable<Product> {
    return this.http.put<Product>(`${this.api}/products/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/products/${id}`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/products/${id}`);
  }
}
