import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '@features/products/models/product';
import { ProductService } from '@features/products/services/product.service';
import { QuoteItemCreate } from '@features/quotes/models/quote-item-create';
import { QuoteItemDialogData } from '@features/quotes/models/quote-item-dialog-data';
import { QuoteItemUpdate } from '@features/quotes/models/quote-item-update';
import { QuoteItemService } from '@features/quotes/services/quote.item.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-quote-item-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './quote-item-dialog.html',
  styleUrl: './quote-item-dialog.scss',
})
export class QuoteItemDialog implements OnInit {
  private readonly data = inject<QuoteItemDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<QuoteItemDialog>);
  private readonly productService = inject(ProductService);
  private readonly notification = inject(NotificationService);
  readonly isEdit = computed(() => !!this.data.quoteItem);

  private readonly quoteItemService = inject(QuoteItemService);

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    productId: [null as number | null, Validators.required],

    quantity: [1, [Validators.required, Validators.min(1)]],
  });

  readonly products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProducts();
    if (this.data.quoteItem) {
      this.form.patchValue({
        productId: this.data.quoteItem.productId,

        quantity: this.data.quoteItem.quantity,
      });
      this.form.controls.productId.disable();
    }
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.isEdit()) {
      this.update();

      return;
    }

    this.create();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  create() {
    const { productId, quantity } = this.form.getRawValue();

    const request: QuoteItemCreate = {
      quoteId: this.data.quoteId,
      productId: productId!, // Seguro porque el formulario ya es válido
      quantity: quantity!,
    };

    this.quoteItemService.create(request).subscribe({
      next: () => {
        this.notification.success('Producto agregado correctamente.');
        this.dialogRef.close(true);
      },
      error: () => {
        this.notification.error('Ocurrió un error al agregar el producto.');
      },
    });
  }

  update() {
    const { quantity } = this.form.getRawValue();
    const quoteItem = this.data.quoteItem!;

    const request: QuoteItemUpdate = {
      quantity: quantity!,
    };

    this.quoteItemService.update(quoteItem.id, request).subscribe({
      next: () => {
        this.notification.success('Producto actualizado correctamente.');
        this.dialogRef.close(true);
      },
      error: () => {
        this.notification.error('Ocurrió un error al actualizar el producto.');
      },
    });
  }
}
