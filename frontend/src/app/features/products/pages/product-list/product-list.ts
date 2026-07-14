import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductService } from '@features/customers/services/product.service';
import { ProductForm } from '@features/products/components/product-form/product-form';
import { Product } from '@features/products/models/product';
import { ConfirmDialog } from '@shared/ui/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-product-list',
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
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  displayedColumns: string[] = ['sku', 'name', 'price', 'stock', 'status', 'actions'];
  private readonly productService = inject(ProductService);
  readonly products = signal<Product[]>([]);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (products) => this.products.set(products),
      error: (error) => console.error(error),
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ProductForm);

    dialogRef.afterClosed().subscribe((product) => {
      if (product) {
        this.loadProducts();
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductForm, {
      data: {
        id: product.id,
      }
    });

    dialogRef.afterClosed().subscribe((product) => {
      if (product) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Eliminar cliente',
        message: `¿Está seguro de eliminar el producto ${product.name} - ${product.sku}?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.productService.delete(product.id).subscribe({
        next: () => this.loadProducts(),
        error: (error) => console.error(error),
      });
    });
  }
}
