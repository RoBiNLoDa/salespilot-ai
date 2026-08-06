import { Component, effect, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QuoteService } from '@features/quotes/services/quote.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { Quote } from '@features/quotes/models/quote';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuoteDialog } from '@features/quotes/dialogs/quote-dialog/quote-dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '@shared/ui/confirm-dialog/confirm-dialog';
import { NotificationService } from '@shared/services/notification.service';
import { QUOTE_STATUS_CONFIG } from '@features/quotes/models/quote-status-config';
import { QuoteStatus } from '@features/quotes/models/quote-status';
import { StatusChip } from "@shared/ui/status-chip/status-chip";

@Component({
  selector: 'app-quote-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    StatusChip
],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.scss',
})
export class QuoteList {
  private readonly quoteService = inject(QuoteService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly notification = inject(NotificationService);
  protected readonly statusConfig = QUOTE_STATUS_CONFIG;

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

  openCreateDialog() {
    const dialogRef = this.dialog.open(QuoteDialog);

    dialogRef.afterClosed().subscribe((quote) => {
      if (quote) {
        this.quotes.reload();
      }
    });
  }

  deleteQuote(quote: Quote) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Eliminar cotización',
        message: `¿Está seguro de eliminar esta cotización?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.quoteService.delete(quote.id).subscribe({
        next: () => {
          this.notification.success('Cotización eliminada correctamente.');
          this.quotes.reload();
        },
        error: (error) => {
          this.notification.error('Ocurrió un error al eliminar la cotización.');
          console.error(error);
        },
      });
    });
  }
}
