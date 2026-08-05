import { Component, inject, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  imports: [],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss',
})
export class QuoteForm {
  private readonly fb = inject(FormBuilder);

  readonly save = output<any>();

  readonly form = this.fb.nonNullable.group({
    customerId: [0, Validators.required],

    issueDate: ['', Validators.required],

    expirationDate: ['', Validators.required],

    notes: [''],
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.save.emit(this.form.getRawValue());
  }
}
