import { Component, computed, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CustomerForm } from '@features/customers/components/customer-form/customer-form';
import { Customer } from '@features/customers/models/customer';
import { CustomerService } from '@features/customers/services/customer.service';
import { LoadingService } from '@shared/services/loading.service';
import { NotificationService } from '@shared/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-customer-dialog',
  imports: [MatDialogModule, MatButtonModule, CustomerForm, MatProgressSpinner],
  templateUrl: './customer-dialog.html',
  styleUrl: './customer-dialog.scss',
})
export class CustomerDialog {
  private readonly dialogRef = inject(MatDialogRef<CustomerDialog>);
  private readonly customerService = inject(CustomerService);
  readonly customer = inject(MAT_DIALOG_DATA, { optional: true }) as Customer | null;
  readonly editing = computed(() => this.customer !== null);
  private readonly notification = inject(NotificationService);

  @ViewChild(CustomerForm)
  customerForm!: CustomerForm;
  protected readonly loading = inject(LoadingService);

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

    this.loading.show();

    request.pipe(finalize(() => this.loading.hide())).subscribe({
      next: (customer) => {
        this.notification.success(
          this.editing() ? 'Cliente actualizado correctamente.' : 'Cliente creado correctamente.',
        );
        this.dialogRef.close(customer);
      },
      error: () => {
        this.notification.error('Ocurrió un error al guardar el cliente.');
      },
    });
  }
}
