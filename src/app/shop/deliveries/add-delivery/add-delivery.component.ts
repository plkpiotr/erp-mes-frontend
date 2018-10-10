import {Component, OnInit, ViewChild} from '@angular/core';
import {DeliveryService} from '../../../services/delivery.service';
import {Router} from '@angular/router';
import {Delivery, DeliveryItem, DeliveryItemRequest, DeliveryRequest, Item} from '../../../types';
import {ItemService} from '../../../services/item.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent implements OnInit {

  itemsForm: FormGroup;
  form: FormGroup;
  itemId: FormControl;
  quantity: FormControl;
  deliveryItemRequest: DeliveryItemRequest;
  deliveryItemRequests: DeliveryItemRequest[];
  scheduledFor: FormControl;
  deliveryRequest: DeliveryRequest;
  itemsById: Item[];
  items: Item[];
  areItemsLoaded = false;
  recommendedDeliveryItems: DeliveryItemRequest[];
  remainingItems: Item[];
  dataSource: MatTableDataSource<DeliveryItemRequest> = new MatTableDataSource([]);
  paginator: any;
  today: Date;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private deliveryService: DeliveryService,
              private router: Router,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.today = new Date();
    this.remainingItems = new Array();
    this.itemsById = new Array();

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
        this.items.forEach(item => this.itemsById[item.id] = item);
        this.items.forEach(item => {
          if (this.recommendedDeliveryItems.filter(rec => rec.itemId === item.id).length === 0) {
            this.remainingItems.push(item);
          }
        });
      });
    });
    this.deliveryItemRequests = new Array();
    this.setupFormControls();
    this.itemsForm = new FormGroup({
      "itemId": this.itemId,
      "quantity": this.quantity
    });
    this.form = new FormGroup({
      "scheduledFor": this.scheduledFor
    });
  }

  setupFormControls() {
    this.itemId = new FormControl('', [
      Validators.required
    ]);
    this.quantity = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.scheduledFor = new FormControl('', [
      Validators.required,
    ]);
  }

  addDeliveryItem() {
    this.deliveryItemRequest = {
      itemId: this.itemsForm.get('itemId').value,
      quantity: this.itemsForm.get('quantity').value
    };
    this.deliveryItemRequests.push(this.deliveryItemRequest);
    this.dataSource = new MatTableDataSource<DeliveryItemRequest>(this.deliveryItemRequests);
    this.remainingItems = this.remainingItems.filter(item => item.id !== this.deliveryItemRequest.itemId);
    this.itemsForm.reset();
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
    this.dataSource = new MatTableDataSource<DeliveryItemRequest>(this.deliveryItemRequests);
  }

  addDelivery() {
    this.deliveryRequest = {
      deliveryItemRequests: this.deliveryItemRequests,
      scheduledFor: this.form.get('scheduledFor').value
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

  getErrorMessage() {
    return this.quantity.hasError('pattern') ? 'Enter a number' : '';
  }

}
