import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
    MatPaginatorModule,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  displayedColumns: string[] = ['sku', 'name', 'price', 'stock', 'status', 'actions'];
  private readonly productService = inject(ProductService);
  private products = rxResource({
    stream: () => this.productService.getAll(),
  });
  private readonly dialog = inject(MatDialog);

  readonly dataSource = new MatTableDataSource<Product>();

  constructor() {
    effect(() => {
      this.dataSource.data = this.products.value() ?? [];
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ProductForm);

    dialogRef.afterClosed().subscribe((product) => {
      if (product) {
        this.products.reload();
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductForm, {
      data: {
        id: product.id,
      },
    });

    dialogRef.afterClosed().subscribe((product) => {
      if (product) {
        this.products.reload();
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
        next: () => this.products.reload(),
        error: (error) => console.error(error),
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
