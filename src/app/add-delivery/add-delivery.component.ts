import {Component, OnInit} from '@angular/core';
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
  recommendedDeliveryItems: DeliveryItemRequest[];
  remainingItems: Item[];

  constructor(private deliveryService: DeliveryService,
              private router: Router,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.remainingItems = new Array();

    this.deliveryService.getRecommendations().subscribe(res => {
      this.recommendedDeliveryItems = res;
    }, err => {
      console.log(err);
    }, () => {
      this.itemService.fetchAllItems().subscribe(res => {
        this.items = res;
      }, err => {
        console.log(err);
      }, () => {
        this.areItemsLoaded = true;
        this.items.forEach(item => {
          if(this.recommendedDeliveryItems.filter(rec => rec.itemId === item.id).length === 0) {
            this.remainingItems.push(item);
          }
        })
      });
    });
    this.deliveryItemRequests = new Array();
  }

  addDeliveryItem() {
    this.deliveryItemRequest = {
      itemId: this.itemId,
      quantity: this.quantity
    };
    this.deliveryItemRequests.push(this.deliveryItemRequest);
    this.remainingItems = this.remainingItems.filter(item => item.id !== this.itemId);
    this.itemId = null;
    this.quantity = null;
    this.deliveryItemRequest = null;
  }

  addRecommendedItem(recItemId: number, recQuantity: number) {
    const recommendedItemRequest = {
      itemId: recItemId,
      quantity: recQuantity
    };
    this.recommendedDeliveryItems = this.recommendedDeliveryItems.filter(rec =>
      rec.itemId !== recItemId
    );
    this.deliveryItemRequests.push(recommendedItemRequest);
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
}
