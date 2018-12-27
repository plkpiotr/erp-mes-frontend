import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../services/item.service';
import {Router} from '@angular/router';
import {Item, ItemRequest} from '../../../types';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";

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
              private router: Router,
              private dialog: MatDialog) {
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
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err);
      }
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

  showError(err) {
    this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });
  }
}
