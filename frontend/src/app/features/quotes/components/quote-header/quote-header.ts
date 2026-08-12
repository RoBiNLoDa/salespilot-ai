import { Component, computed, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Quote } from '@features/quotes/models/quote';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { QUOTE_STATUS_CONFIG } from '@features/quotes/models/quote-status-config';
import { StatusChip } from '@shared/ui/status-chip/status-chip';
import { QuoteStatus } from '@features/quotes/models/quote-status';

@Component({
  selector: 'app-quote-header',
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule, StatusChip],
  templateUrl: './quote-header.html',
  styleUrl: './quote-header.scss',
})
export class QuoteHeader {
  readonly quote = input.required<Quote>();
  readonly edit = output<void>();
  readonly addItem = output<void>();
  protected readonly statusConfig = QUOTE_STATUS_CONFIG;
  readonly changeStatus = output<void>();
  readonly editable = input(false);
  readonly canChangeStatus = computed(() => {
    const status = this.quote().status;

    return (
      status !== QuoteStatus.ACCEPTED &&
      status !== QuoteStatus.REJECTED &&
      status !== QuoteStatus.EXPIRED
    );
  });
}
