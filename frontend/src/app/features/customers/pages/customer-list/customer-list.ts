import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Customer } from '@features/customers/models/customer';
import { CustomerService } from '@features/customers/services/customer.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDialog } from '@features/customers/dialogs/customer-dialog/customer-dialog';

@Component({
  selector: 'app-customer-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatChipsModule,
  ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerList implements OnInit {
  displayedColumns: string[] = ['name', 'company', 'city', 'status', 'actions'];
  readonly customers = signal<Customer[]>([]);
  private readonly customerService = inject(CustomerService);
  private readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (customers) => this.customers.set(customers),
      error: (error) => console.error(error),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CustomerDialog);

    dialogRef.afterClosed().subscribe((customer) => {
      if (customer) {
        this.loadCustomers;
      }
    });
  }
}
