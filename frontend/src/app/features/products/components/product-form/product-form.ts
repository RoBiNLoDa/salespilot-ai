import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProductService } from '@features/customers/services/product.service';
import { LoadingService } from '@shared/services/loading.service';
import { NotificationService } from '@shared/services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinner
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<ProductForm>);
  readonly data = inject<{ id?: number }>(MAT_DIALOG_DATA, { optional: true });
  private readonly productService = inject(ProductService);
  private readonly fb = inject(FormBuilder);
  productForm!: FormGroup;
  readonly editing = computed(() => !!this.data?.id);
  protected readonly loading = inject(LoadingService);
  private readonly notification = inject(NotificationService);

  ngOnInit(): void {
    this.createForm();
    if (!this.data?.id) {
      return;
    }

    this.productService.getById(this.data.id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
      },
    });
  }

  createForm() {
    this.productForm = this.fb.nonNullable.group({
      sku: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(150)]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      cost: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+$/)]],
      active: [true],
    });
  }

  cancel(): void {
      this.dialogRef.close();
    }
  
    save(): void {
        if (this.productForm.invalid) {
          this.productForm.markAllAsTouched();
          return;
        }
    
        const value = this.productForm.getRawValue();
    
        const request = this.editing()
          ? this.productService.update(this.data?.id!, value)
          : this.productService.create(value);
    
        this.loading.show();
    
        request.pipe(finalize(() => this.loading.hide())).subscribe({
          next: (product) => {
            this.notification.success(
              this.editing() ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.',
            );
            this.dialogRef.close(product);
          },
          error: () => {
            this.notification.error('Ocurrió un error al guardar el producto.');
          },
        });
      }

}
