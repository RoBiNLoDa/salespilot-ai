import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '@features/quotes/models/quote';
import { QuoteService } from '@features/quotes/services/quote.service';
import { QuoteHeader } from '@features/quotes/components/quote-header/quote-header';
import { QuoteItemTable } from '@features/quotes/components/quote-item-table/quote-item-table';
import { MatDialog } from '@angular/material/dialog';
import { QuoteItemDialog } from '@features/quotes/dialogs/quote-item-dialog/quote-item-dialog';
import { QuoteItem } from '@features/quotes/models/quote-item';
import { ConfirmDialog } from '@shared/ui/confirm-dialog/confirm-dialog';
import { QuoteItemService } from '@features/quotes/services/quote.item.service';
import { NotificationService } from '@shared/services/notification.service';
import { QuoteDialog } from '@features/quotes/dialogs/quote-dialog/quote-dialog';
import { QuoteStatusDialog } from '@features/quotes/dialogs/quote-status-dialog/quote-status-dialog-data';

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

  private readonly quoteItemService = inject(QuoteItemService);

  private readonly notification = inject(NotificationService);

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

  editQuote() {
    const dialogRef = this.dialog.open(QuoteDialog, {
      data: {
        quote: this.quote(),
      },
    });

    dialogRef.afterClosed().subscribe((quote) => {
      if (quote) {
        this.loadQuote(quote.id);
      }
    });
  }

  openAddItemDialog() {
    this.dialog
      .open(QuoteItemDialog, {
        data: {
          quoteId: this.quote()!.id,
        },
        width: '350px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadQuote(this.quote()!.id);
        }
      });
  }

  editItem(item: QuoteItem): void {
    this.dialog
      .open(QuoteItemDialog, {
        data: {
          quoteId: this.quote()!.id,

          quoteItem: item,
        },
        width: '350px',
      })
      .afterClosed()
      .subscribe(() => this.loadQuote(this.quote()!.id));
  }

  deleteItem(item: QuoteItem) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Eliminar producto',
        message: `¿Está seguro de eliminar este producto de la cotización?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.quoteItemService.delete(item.id).subscribe({
        next: () => {
          this.notification.success('Producto eliminado correctamente.');
          this.loadQuote(this.quote()!.id);
        },
        error: (error) => {
          this.notification.error('Ocurrió un error al eliminar el producto.');
          console.error(error);
        },
      });
    });
  }

  changeStatus() {
    const dialogRef = this.dialog.open(QuoteStatusDialog, {
      data: {
        quote: this.quote(),
      },
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) {
        this.loadQuote(this.quote()!.id);
      }
    });
  }
}
