import {Component, OnInit, ViewChild} from '@angular/core';
import {
  Complaint,
  DeliveryItemRequest,
  Item,
  Order,
  Return,
  ShopServiceRequest
} from '../../../types';
import {OrderService} from '../../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../../services/item.service';
import {ComplaintService} from '../../../services/complaint.service';
import {ReturnService} from '../../../services/return.service';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {Resolution} from "../../../globals";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  itemsForm: FormGroup;
  form: FormGroup;
  complaintForm: FormGroup;
  itemId: FormControl;
  quantity: FormControl;
  deliveryItemRequest: DeliveryItemRequest;
  deliveryItemRequests: Array<DeliveryItemRequest>;
  scheduledFor: FormControl;
  request: ShopServiceRequest;
  items: Item[];
  itemsById: Item[];
  areItemsLoaded = false;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNumber?: FormControl;
  street: FormControl;
  houseNumber: FormControl;
  city: FormControl;
  postalCode: FormControl;
  requestedResolution: FormControl;
  fault: FormControl;
  service: string;
  resolutions;
  dataSource: MatTableDataSource<DeliveryItemRequest> = new MatTableDataSource([]);
  paginator: any;
  today: Date;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private orderService: OrderService, private router: Router, private itemService: ItemService,
              private complaintService: ComplaintService, private returnService: ReturnService,
              private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.today = new Date();
    this.itemsById = [];
    this.fetchItems();
    this.deliveryItemRequests = [];
    this.resolutions = Object.keys(Resolution);
    this.route.queryParams.subscribe(params => this.service = params['service']);
    this.setupFormControls();
    this.itemsForm = new FormGroup({
      "itemId": this.itemId,
      "quantity": this.quantity
    });
    this.form = new FormGroup({
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "phoneNumber": this.phoneNumber,
      "street": this.street,
      "houseNumber": this.houseNumber,
      "city": this.city,
      "postalCode": this.postalCode,
      "scheduledFor": this.scheduledFor
    });
    this.complaintForm = new FormGroup({
      "requestedResolution": this.requestedResolution,
      "fault": this.fault
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
    this.firstName = new FormControl('', [
      Validators.required
    ]);
    this.lastName = new FormControl('', [
      Validators.required
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.phoneNumber = new FormControl(null, [
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(9),
      Validators.minLength(9)
    ]);
    this.street = new FormControl('', [
      Validators.required
    ]);
    this.houseNumber = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.city = new FormControl('', [
      Validators.required
    ]);
    this.postalCode = new FormControl('', [
      Validators.required,
      Validators.pattern("\\d{2}-\\d{3}"),
    ]);
    this.requestedResolution = new FormControl(null, [
      Validators.required
    ]);
    this.fault = new FormControl(null, [
      Validators.required
    ]);
    this.scheduledFor = new FormControl('', [
      Validators.required
    ]);
  }

  addDeliveryItem() {
    this.deliveryItemRequest = {
      itemId: this.itemsForm.get('itemId').value,
      quantity: this.itemsForm.get('quantity').value
    };
    this.deliveryItemRequests.push(this.deliveryItemRequest);
    this.dataSource = new MatTableDataSource<DeliveryItemRequest>(this.deliveryItemRequests);
    this.items = this.items.filter(item => item.id !== this.deliveryItemRequest.itemId);
    this.itemsForm.reset();
    this.deliveryItemRequest = null;
  }

  add() {
    this.request = {
      deliveryItemRequests: this.deliveryItemRequests,
      scheduledFor: this.form.get('scheduledFor').value,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
      phoneNumber: this.form.get('phoneNumber').value,
      street: this.form.get('street').value,
      houseNumber: this.form.get('houseNumber').value,
      city: this.form.get('city').value,
      postalCode: this.form.get('postalCode').value,
      requestedResolution: this.complaintForm.get('requestedResolution').value,
      fault: this.complaintForm.get('fault').value
    };
    if (this.service === 'order') {
      let order: Order;
      this.orderService.addOneOrder(this.request).subscribe(res => {
        order = res;
        order.deliveryItems.forEach(deliveryItem => {
          this.itemService.buyItem(deliveryItem.item.id, deliveryItem.quantity).subscribe(res => {});
        });
      }, err => {
        this.showError(err, false);
      }, () => {
        this.router.navigate(['/orders', order.id]);
      });
    } else if (this.service === 'return') {
      let r: Return;
      this.returnService.addOneReturn(this.request).subscribe(res => {
        r = res;
      }, err => {
        this.showError(err, false);
      }, () => {
        this.router.navigate(['/returns', r.id]);
      });
    } else if (this.service === 'complaint') {
      let complaint: Complaint;
      this.complaintService.addOneComplaint(this.request).subscribe(res => {
        complaint = res;
      }, err => {
        this.showError(err, false);
      }, () => {
        this.router.navigate(['/complaints', complaint.id]);
      });
    }
  }

  fetchItems() {
    this.itemService.fetchAllItems().subscribe(res => {
      this.items = res;
    }, err => {
      this.showError(err, true);
    }, () => {
      this.areItemsLoaded = true;
      this.items.forEach(item => this.itemsById[item.id] = item);
    });
  }

  getQuantityErrorMessage() {
    return this.quantity.hasError('pattern') ? 'Enter a number' : '';
  }

  getHouseNumberErrorMessage() {
    return this.quantity.hasError('pattern') ? 'Enter a number' : '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  shouldDisableButton(): boolean {
    return this.form.invalid || (this.service === 'complaint' && this.complaintForm.invalid)
      || this.deliveryItemRequests.length === 0;
  }

  shouldShowComplaintForm(): boolean {
    return this.service === 'complaint';
  }

  showError(err, redirect: boolean) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });

    if (redirect) {
      if (this.service === 'order') {
        dialogRef.afterClosed().subscribe(() => this.router.navigate(['/orders']));
      } else if (this.service === 'return') {
        dialogRef.afterClosed().subscribe(() => this.router.navigate(['/returns']));
      } else if (this.service === 'complaint') {
        dialogRef.afterClosed().subscribe(() => this.router.navigate(['/orders']));
      }
    }
  }

}
