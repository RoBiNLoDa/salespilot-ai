import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { QuoteCreate } from '@features/quotes/models/quote-create';
import { QuoteService } from '@features/quotes/services/quote.service';
import { NotificationService } from '@shared/services/notification.service';
import { QuoteForm } from "@features/quotes/components/quote-form/quote-form";

@Component({
  selector: 'app-quote-dialog',
  imports: [MatDialogModule, QuoteForm],
  templateUrl: './quote-dialog.html',
  styleUrl: './quote-dialog.scss',
})
export class QuoteDialog {
  private readonly dialogRef = inject(MatDialogRef<QuoteDialog>);

  private readonly quoteService = inject(QuoteService);

  private readonly notification = inject(NotificationService);

  save(request: QuoteCreate): void {
    this.quoteService.create(request).subscribe({
      next: (quote) => {
        this.notification.success('Cotización creada correctamente');

        this.dialogRef.close(quote);
      },
    });
  }
}
