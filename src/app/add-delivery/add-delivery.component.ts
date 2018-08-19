import { Component, OnInit } from '@angular/core';
import {DeliveryService} from "../delivery.service";
import {Router} from "@angular/router";
import {Delivery, DeliveryItemRequest, DeliveryRequest, Item} from "../types";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {

  itemId: number;
  quantity: number;
  deliveryItemRequest: DeliveryItemRequest;
  deliveryItemRequests: DeliveryItemRequest[];
  scheduledFor: Date;
  deliveryRequest: DeliveryRequest;
  items: Item[];
  areItemsLoaded = false;

  constructor(private deliveryService: DeliveryService,
              private router: Router,
              private itemService: ItemService) { }

  ngOnInit() {
    this.fetchItems();
    this.deliveryItemRequests = new Array();
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

  addDelivery() {
    this.deliveryRequest = {
      deliveryItemRequests: this.deliveryItemRequests,
      scheduledFor: this.scheduledFor
    };
    let delivery: Delivery;
    this.deliveryService.addNewDelivery(this.deliveryRequest).subscribe(res => {
      delivery = res;
    }, err => {
      console.log(err);
    }, () => {
      this.router.navigate(['/deliveries', delivery.id]);
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

  // TODO: fetch recommendations!!!

}
