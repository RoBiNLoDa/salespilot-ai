import { Component, input, output } from '@angular/core';
import { QuoteItem } from '@features/quotes/models/quote-item';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quote-item-table',
  imports: [MatTableModule, MatCardModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './quote-item-table.html',
  styleUrl: './quote-item-table.scss',
})
export class QuoteItemTable {
  readonly items = input.required<QuoteItem[]>();

  readonly edit = output<QuoteItem>();

  readonly delete = output<QuoteItem>();

  readonly displayedColumns = [
    'product',
    'quantity',
    'unitPrice',
    'discount',
    'subtotal',
    'taxRate',
    'tax',
    'total',
    'actions',
  ];
}
