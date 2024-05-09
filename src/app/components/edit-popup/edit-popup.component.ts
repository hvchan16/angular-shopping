import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {

  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;
  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  @Input() product: Product = {
    name: '',
    price: '',
    image: '',
    rating: 0,
  };

  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: ['', []],
    image: ['', []],
    rating: [0, []],
  });

  ngOnChanges(){
    this.productForm.patchValue(this.product);
  }

  OnConfirm() {
    this.confirm.emit({
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || '',
      image: this.productForm.value.image || '',
      rating: this.productForm.value.rating || 0,
    });
  }

  OnCancel() {
    this.display = false; 
  }
}
