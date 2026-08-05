import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '@features/quotes/models/quote';
import { QuoteService } from '@features/quotes/services/quote.service';
import { QuoteHeader } from '@features/quotes/components/quote-header/quote-header';
import { QuoteItemTable } from '@features/quotes/components/quote-item-table/quote-item-table';
import { MatDialog } from '@angular/material/dialog';
import { QuoteItemDialog } from '@features/quotes/dialogs/quote-item-dialog/quote-item-dialog';

@Component({
  selector: 'app-quote-detail',
  imports: [QuoteHeader, QuoteItemTable],
  templateUrl: './quote-detail.html',
  styleUrl: './quote-detail.scss',
})
export class QuoteDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly quoteService = inject(QuoteService);

  readonly quote = signal<Quote | null>(null);

  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuote(id);
  }

  private loadQuote(id: number): void {
    this.quoteService.getById(id).subscribe({
      next: (quote) => {
        this.quote.set(quote);
      },
    });
  }

  editQuote() {}

  openAddItemDialog() {
    this.dialog
      .open(QuoteItemDialog, {
        data: {
          quoteId: this.quote()!.id,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadQuote(this.quote()!.id);
        }
      });
  }

  editItem(event: any) {}
  deleteItem(event: any) {}
}
