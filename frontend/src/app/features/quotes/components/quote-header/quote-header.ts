import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Quote } from '@features/quotes/models/quote';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-header',
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './quote-header.html',
  styleUrl: './quote-header.scss',
})
export class QuoteHeader {
  readonly quote = input.required<Quote>();
  readonly edit = output<void>();
  readonly addItem = output<void>();

}
