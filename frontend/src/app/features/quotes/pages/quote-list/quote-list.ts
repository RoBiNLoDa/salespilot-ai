import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QuoteService } from '@features/quotes/services/quote.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { Quote } from '@features/quotes/models/quote';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
  ],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.scss',
})
export class QuoteList {
  private readonly quoteService = inject(QuoteService);
  private readonly router = inject(Router)

  displayedColumns = ['quoteNumber', 'customer', 'issueDate', 'status', 'actions'];

  private quotes = rxResource({
    stream: () => this.quoteService.getAll(),
  });

  readonly dataSource = new MatTableDataSource<Quote>();

  constructor() {
    effect(() => {
      this.dataSource.data = this.quotes.value() ?? [];
    });
  }

  viewQuote(quote: Quote): void {
    this.router.navigate(['/quotes', quote.id]);
  }
}
