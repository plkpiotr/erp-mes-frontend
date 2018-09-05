import {Component, OnInit} from '@angular/core';
import {
  Complaint,
  DeliveryItemRequest,
  Item,
  Order,
  Resolution,
  Return,
  ShopServiceRequest
} from '../types';
import {OrderService} from '../order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../item.service';
import {ComplaintService} from "../complaint.service";
import {ReturnService} from "../return.service";

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
  request: ShopServiceRequest;
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
  requestedResolution: Resolution = null;
  fault: string = null;
  service: string;
  resolutions;

  constructor(private orderService: OrderService, private router: Router, private itemService: ItemService,
              private complaintService: ComplaintService, private returnService: ReturnService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchItems();
    this.deliveryItemRequests = [];
    this.resolutions = Object.keys(Resolution);
    this.route.queryParams.subscribe(params => this.service = params['service']);
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

  add() {
    this.request = {
      deliveryItemRequests: this.deliveryItemRequests,
      scheduledFor: this.scheduledFor,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      street: this.street,
      houseNumber: this.houseNumber,
      city: this.city,
      postalCode: this.postalCode,
      requestedResolution: this.requestedResolution,
      fault: this.fault
    };
    if (this.service === 'order') {
      let order: Order;
      this.orderService.addOneOrder(this.request).subscribe(res => {
        order = res;
      }, err => {
        console.log(err);
      }, () => {
        this.router.navigate(['/orders', order.id]);
      });
    } else if (this.service === 'return') {
      let r: Return;
      this.returnService.addOneReturn(this.request).subscribe(res => {
        r = res;
      }, err => {
        console.log(err);
      }, () => {
        this.router.navigate(['/returns', r.id]);
      });
    } else if (this.service === 'complaint') {
      let complaint: Complaint;
      this.complaintService.addOneComplaint(this.request).subscribe(res => {
        complaint = res;
      }, err => {
        console.log(err);
      }, () => {
        this.router.navigate(['/complaints', complaint.id]);
      });
    }
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
