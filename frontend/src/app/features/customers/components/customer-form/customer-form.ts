import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Customer } from '@features/customers/models/customer';

@Component({
  selector: 'app-customer-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm {
  private readonly fb = inject(FormBuilder);
  customer = input<Customer | null>();
  readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],

    lastName: ['', Validators.required],

    company: ['', Validators.required],

    email: ['', [Validators.required, Validators.email]],

    phone: ['', Validators.required],

    city: ['', Validators.required],

    active: true,
  });

  constructor() {
    effect(() => {
      const customer = this.customer();
      if (!customer) return;
      this.form.patchValue({
        firstName: customer.firstName,
        lastName: customer.lastName,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        city: customer.city,
        active: customer.active,
      });
    });
  }

}
