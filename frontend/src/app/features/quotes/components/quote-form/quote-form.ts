import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Customer } from '@features/customers/models/customer';
import { CustomerService } from '@features/customers/services/customer.service';
import { Quote } from '@features/quotes/models/quote';
import { toLocalDate } from '@shared/utils/date.util';

@Component({
  selector: 'app-quote-form',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss',
})
export class QuoteForm implements OnInit {
  readonly quote = input<Quote | undefined>();
  private readonly fb = inject(FormBuilder);
  private readonly customerService = inject(CustomerService);
  readonly customers = signal<Customer[]>([]);

  readonly save = output<any>();

  readonly form = this.fb.nonNullable.group({
    customerId: [null as number | null, Validators.required],

    issueDate: [null as Date | null, Validators.required],

    expirationDate: [null as Date | null, Validators.required],

    notes: [''],
  });

  ngOnInit(): void {
    this.loadCustomers();
    const quote = this.quote();
    if (!quote) return;
    this.form.patchValue({
      customerId: this.quote()!.customerId,
      issueDate: toLocalDate(this.quote()!.issueDate),
      expirationDate: toLocalDate(this.quote()!.expirationDate),
      notes: this.quote()!.notes || '',
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.save.emit(this.form.getRawValue());
  }

  private loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (customers) => this.customers.set(customers),
    });
  }
}
