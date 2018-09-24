import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../services/item.service';
import {Router} from '@angular/router';
import {Item, ItemRequest} from '../../../types';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {

  name: string;
  stockPrice: number;
  price: number;
  itemRequest: ItemRequest;

  constructor(private itemService: ItemService,
              private router: Router) { }

  submitForm() {
    this.itemRequest = {
      name: this.name,
      stockPrice: this.stockPrice,
      price: this.price
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

}
