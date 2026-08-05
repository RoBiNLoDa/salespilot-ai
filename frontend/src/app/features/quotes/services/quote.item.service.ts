import { Injectable } from '@angular/core';
import { CrudService } from '@core/services/crud.service';
import { QuoteItem } from '../models/quote-item';
import { QuoteItemCreate } from '../models/quote-item-create';
import { QuoteItemUpdate } from '../models/quote-item-update';
import { API } from '@core/config/application.config';

@Injectable({
  providedIn: 'root',
})
export class QuoteItemService extends CrudService<QuoteItem, QuoteItemCreate, QuoteItemUpdate> {
  protected override apiUrl: string = API.quoteItems;
}
