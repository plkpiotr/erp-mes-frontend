import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../services/item.service';
import {Router} from '@angular/router';
import {Item, ItemRequest} from '../../../types';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {

  form: FormGroup;
  name: FormControl;
  stockPrice: FormControl;
  price: FormControl;
  itemRequest: ItemRequest;

  constructor(private itemService: ItemService,
              private router: Router) {
    this.setupFormControls();
    this.form = new FormGroup({
      "name": this.name,
      "stockPrice": this.stockPrice,
      "price": this.price
    });
  }

  setupFormControls() {
    this.name = new FormControl('', [
      Validators.required
    ]);
    this.stockPrice = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.price = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
  }

  submitForm() {
    this.itemRequest = {
      name: this.form.get('name').value,
      stockPrice: this.form.get('stockPrice').value,
      price: this.form.get('price').value
    };
    let item: Item;
    this.itemService.addNewItem(this.itemRequest).subscribe(res => {
      item = res;
    }, err => {
      console.log(err);
    }, () => {
      this.router.navigate(['/items', item.id]);
    });
  }

  getStockErrorMessage() {
    return this.stockPrice.hasError('pattern') ? 'Enter a number' : '';
  }

  getPriceErrorMessage() {
    return this.price.hasError('pattern') ? 'Enter a number' : '';
  }
}
