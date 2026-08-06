import { Injectable } from '@angular/core';
import { Quote } from '../models/quote';
import { QuoteCreate } from '../models/quote-create';
import { QuoteUpdate } from '../models/quote-update';
import { API } from '@core/config/application.config';
import { CrudService } from '@core/services/crud.service';
import { QuoteStatusUpdate } from '../models/quote-status-update';

@Injectable({
  providedIn: 'root',
})
export class QuoteService extends CrudService<Quote, QuoteCreate, QuoteUpdate> {
  protected override apiUrl: string = API.quotes;

  updateStatus(id: number, request: QuoteStatusUpdate) {
    return this.http.patch<Quote>(`${this.apiUrl}/${id}/status`, request);
  }
}
