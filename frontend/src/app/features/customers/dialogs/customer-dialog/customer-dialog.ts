import { Component, computed, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomerForm } from '@features/customers/components/customer-form/customer-form';
import { Customer } from '@features/customers/models/customer';
import { CustomerService } from '@features/customers/services/customer.service';

@Component({
  selector: 'app-customer-dialog',
  imports: [MatDialogModule, MatButtonModule, CustomerForm],
  templateUrl: './customer-dialog.html',
  styleUrl: './customer-dialog.scss',
})
export class CustomerDialog {
  private readonly dialogRef = inject(MatDialogRef<CustomerDialog>);
  private readonly customerService = inject(CustomerService);
  readonly customer = inject(MAT_DIALOG_DATA, { optional: true }) as Customer | null;
  readonly editing = computed(() => this.customer !== null);

  @ViewChild(CustomerForm)
  customerForm!: CustomerForm;

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.customerForm.form.invalid) {
      this.customerForm.form.markAllAsTouched();
      return;
    }

    const value = this.customerForm.form.getRawValue();

    const request = this.editing()
      ? this.customerService.update(this.customer!.id, value)
      : this.customerService.create(value);

    request.subscribe({
      next: (customer) => this.dialogRef.close(customer),
      error: (error) => console.error(error),
    });
  }
}
