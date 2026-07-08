import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomerForm } from '@features/customers/components/customer-form/customer-form';
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

    this.customerService.create(this.customerForm.form.getRawValue()).subscribe({
      next: (customer) => {
        this.dialogRef.close(customer);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
