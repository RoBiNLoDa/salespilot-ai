import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuoteStatus } from '@features/quotes/models/quote-status';
import { QUOTE_STATUS_CONFIG } from '@features/quotes/models/quote-status-config';
import { QuoteStatusUpdate } from '@features/quotes/models/quote-status-update';
import { QuoteService } from '@features/quotes/services/quote.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-quote-status-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule ],
  templateUrl: './quote-status-dialog.html',
  styleUrl: './quote-status-dialog.scss',
})
export class QuoteStatusDialog implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly quoteService = inject(QuoteService);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<QuoteStatusDialog>);
  private readonly notification = inject(NotificationService);
  readonly statuses = Object.values(QuoteStatus);
   protected readonly statusConfig = QUOTE_STATUS_CONFIG;

  readonly form = this.fb.nonNullable.group({
    status: [QuoteStatus.DRAFT, Validators.required],
  });

  ngOnInit(): void {
    console.log(this.statuses)
    this.form.patchValue({
      status: this.data.quote.status,
    });
  }

  save() {
    const request: QuoteStatusUpdate = {
      status: this.form.getRawValue().status!,
    };
    console.log(request)
    console.log(this.form.getRawValue().status!)
    this.quoteService.updateStatus(this.data.quote.id, request).subscribe({
      next: (quote) => {
        this.notification.success('Estado actualizado correctamente.');

        this.dialogRef.close(quote);
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
