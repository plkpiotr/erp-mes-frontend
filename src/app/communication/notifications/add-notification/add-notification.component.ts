import {Component, OnInit} from '@angular/core';
import {Complaint, Delivery, Employee, Notification, Order, Return, Type} from '../../../types';
import {NotificationService} from '../../../services/notification.service';
import {EmployeeService} from '../../../services/employee.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {

  notificationRequest;
  form: FormGroup;
  areEmployeesLoaded = false;

  instruction: FormControl;
  description: FormControl;
  consigneeIds: FormControl;
  type: FormControl;

  consignees: Array<Employee>;
  deliveries: Array<Delivery>;
  orders: Array<Order>;
  complaints: Array<Complaint>;
  returns: Array<Return>;
  types;

  constructor(private notificationService: NotificationService, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employeeService.fetchColleagues().subscribe(res => {
      this.consignees = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areEmployeesLoaded = true;
    });
    this.types = Object.keys(Type);
    this.setupFormControls();
    this.form = new FormGroup({
      'instruction': this.instruction,
      'description': this.description,
      'consigneeIds': this.consigneeIds,
      'type': this.type
    });
  }

  setupFormControls() {
    this.instruction = new FormControl('', [
      Validators.maxLength(25),
      Validators.required
    ]);
    this.description = new FormControl('', [
      Validators.maxLength(250),
    ]);
    this.consigneeIds = new FormControl('', [
      Validators.required
    ]);
    this.type = new FormControl('', [
      Validators.required
    ]);
  }

  submitForm() {
    this.notificationRequest = {
      instruction: this.form.get('instruction').value,
      description: this.form.get('description').value,
      consigneeIds: this.form.get('consigneeIds').value,
      type: this.form.get('type').value
    };
    let notification: Notification;
    this.notificationService.addNotification(this.notificationRequest)
      .subscribe(res => {
          notification = res;
        }, err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/notifications', notification.id]);
        });
  }

  getErrorInstruction() {
    return this.instruction.hasError('maxLength') ? '' : 'Maximum 25 characters';
  }

  getErrorDescription() {
    return this.description.hasError('maxLength') ? '' : 'Maximum 250 characters';
  }
}
