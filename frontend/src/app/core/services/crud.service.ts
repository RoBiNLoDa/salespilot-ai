import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class CrudService<TEntity, TCreate, TUpdate> {
  protected readonly http = inject(HttpClient);
  protected abstract readonly apiUrl: string;

  getAll(): Observable<TEntity[]> {
    return this.http.get<TEntity[]>(this.apiUrl);
  }

  getById(id: number): Observable<TEntity> {
    return this.http.get<TEntity>(`${this.apiUrl}/${id}`);
  }

  create(request: TCreate): Observable<TEntity> {
    return this.http.post<TEntity>(this.apiUrl, request);
  }

  update(id: number, request: TUpdate): Observable<TEntity> {
    return this.http.put<TEntity>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
