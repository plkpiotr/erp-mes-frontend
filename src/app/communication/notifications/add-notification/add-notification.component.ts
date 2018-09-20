import {Component, OnInit} from '@angular/core';
import {Employee, Notification, Type} from '../../../types';
import {NotificationService} from '../../../services/notification.service';
import {EmployeeService} from '../../../services/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {

  notificationRequest;
  instruction: string;
  description?: string;
  notifierId?: number;
  consigneeIds: number[];
  type?: Type;
  reference?: number;

  // notifier: Employee; // TODO: Get logged in user
  consignees: Array<Employee>;
  types;

  constructor(private notificationService: NotificationService, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employeeService.fetchAllEmployees().subscribe(res => this.consignees = res);
    this.types = Object.keys(Type);
  }

  submitForm() {
    this.notificationRequest = {
      instruction: this.instruction,
      description: this.description,
      notifierId: null, // TODO: Get logged in user
      consigneeIds: this.consigneeIds,
      type: this.type,
      reference: this.reference
    };
    let notification: Notification;
    this.notificationService.addNotification(this.notificationRequest)
      .subscribe(res => {
          notification = res;
        },
        err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/notifications', notification.id]);
        });
  }
}
