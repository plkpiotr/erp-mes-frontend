import { Component, OnInit } from '@angular/core';
import {Delivery, DeliveryItemRequest, Item, Order, OrderRequest} from '../types';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  itemId: number;
  quantity: number;
  deliveryItemRequest: DeliveryItemRequest;
  deliveryItemRequests: Array<DeliveryItemRequest>;
  scheduledFor: Date;
  orderRequest: OrderRequest;
  items: Item[];
  areItemsLoaded = false;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;

  constructor(private orderService: OrderService, private router: Router, private itemService: ItemService) { }

  ngOnInit() {
    this.fetchItems();
    this.deliveryItemRequests = [];
  }

  addDeliveryItem() {
    this.deliveryItemRequest = {
      itemId: this.itemId,
      quantity: this.quantity
    };
    this.deliveryItemRequests.push(this.deliveryItemRequest);
    this.items = this.items.filter(item => item.id !== this.itemId);
    this.itemId = null;
    this.quantity = null;
    this.deliveryItemRequest = null;
  }

  addOrder() {
    this.orderRequest = {
      deliveryItemRequests: this.deliveryItemRequests,
      scheduledFor: this.scheduledFor,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      street: this.street,
      houseNumber: this.houseNumber,
      city: this.city,
      postalCode: this.postalCode
    };
    let order: Order;
    this.orderService.addNewOrder(this.orderRequest).subscribe(res => {
      order = res;
    }, err => {
      console.log(err);
    }, () => {
      this.router.navigate(['/orders', order.id]);
    });
  }

  fetchItems() {
    this.itemService.fetchAllItems().subscribe(res => {
      this.items = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areItemsLoaded = true;
    });
  }
}
