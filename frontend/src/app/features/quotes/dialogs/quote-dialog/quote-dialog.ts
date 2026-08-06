import { Component, computed, inject, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuoteCreate } from '@features/quotes/models/quote-create';
import { QuoteService } from '@features/quotes/services/quote.service';
import { NotificationService } from '@shared/services/notification.service';
import { QuoteForm } from '@features/quotes/components/quote-form/quote-form';
import { QuoteDialogData } from '@features/quotes/models/quote-dialog-data';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoadingService } from '@shared/services/loading.service';
import { toApiDate } from '@shared/utils/date.util';

@Component({
  selector: 'app-quote-dialog',
  imports: [MatDialogModule, QuoteForm, MatButtonModule, MatProgressSpinner],
  templateUrl: './quote-dialog.html',
  styleUrl: './quote-dialog.scss',
})
export class QuoteDialog {
  readonly data = inject<QuoteDialogData>(MAT_DIALOG_DATA, {
    optional: true,
  }) as QuoteDialogData | null;
  private readonly dialogRef = inject(MatDialogRef<QuoteDialog>, { optional: true });
  readonly isEdit = computed(() => !!this.data?.quote);
  protected readonly loading = inject(LoadingService);
  private readonly quoteService = inject(QuoteService);
  @ViewChild(QuoteForm)
  quoteForm!: QuoteForm;
  private readonly notification = inject(NotificationService);

  save(): void {
    if (this.quoteForm.form.invalid) {
      this.quoteForm.form.markAllAsTouched();
      return;
    }

    const raw = this.quoteForm.form.getRawValue();

    const value: QuoteCreate = {
      customerId: raw.customerId!,
      issueDate: toApiDate(raw.issueDate!),
      expirationDate: toApiDate(raw.expirationDate!),
      notes: raw.notes,
    };

    const request = this.isEdit()
      ? this.quoteService.update(this.data!.quote!.id, value)
      : this.quoteService.create(value);

    request.subscribe({
      next: (quote) => {
        this.notification.success(
          this.isEdit()
            ? 'Cotización actualizada correctamente.'
            : 'Cotización creada correctamente.',
        );

        this.dialogRef?.close(quote);
      },
      error: () => {
        this.notification.error(
          this.isEdit()
            ? 'Ocurrió un error al actualizar la cotización.'
            : 'Ocurrió un error al crear la cotización.',
        );
      },
    });
  }

  cancel(): void {
    this.dialogRef?.close();
  }
}
