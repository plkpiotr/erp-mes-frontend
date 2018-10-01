import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../../services/employee.service';
import {Employee, Holiday, Role, Task} from '../../../types';
import {ActivatedRoute, Router} from '@angular/router';
import {HolidayService} from '../../../services/holiday.service';
import {TaskService} from '../../../services/task.service';
import {LoginService} from '../../../services/login.service';
import {ReplyDialogComponent} from "../../../communication/emails/reply-dialog/reply-dialog.component";
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {ManageHolidaysDialogComponent} from "../../holidays/manage-holidays-dialog/manage-holidays-dialog.component";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employee: Employee;
  tasks: Task[];
  holidays: Holiday[];
  isEmployeeLoaded = false;
  areTasksLoaded = false;
  areHolidaysLoaded = false;
  isUserLoggedIn = false;
  endHolidayDate;
  pendingHolidayStart;
  pendingHolidayEnd;
  dataSource: MatTableDataSource<Holiday> = new MatTableDataSource([]);
  taskDataSource: MatTableDataSource<Task> = new MatTableDataSource([]);
  paginator: any;
  loggedInUserRole: Role;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
    this.taskDataSource.paginator = this.paginator;
  }

  constructor(private employeeService: EmployeeService,
              private taskService: TaskService,
              private holidayService: HolidayService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loginService.fetchUser().subscribe(res => {
      this.loggedInUserRole = res.role;
      if (res.id.toString() === this.route.snapshot.params['id']) {
        this.fetchEmployee();
        this.isUserLoggedIn = true;
      } else {
        this.fetchProfile();
      }
      this.fetchHolidays();
    });
  }

  fetchEmployee() {
    this.employeeService.fetchOneEmployee(this.route.snapshot.params['id']).subscribe(
      res => {
        this.employee = res;
      }, err => {
        console.log(err);
      },
      () => {
        this.isEmployeeLoaded = true;
      }
    );
  }

  fetchProfile() {
    this.employeeService.fetchProfile(this.route.snapshot.params['id']).subscribe(
      res => {
        this.employee = res;
      }, err => {
        console.log(err);
      },
      () => {
        this.isEmployeeLoaded = true;
      }
    );
  }

  fetchHolidays() {
    this.holidayService.fetchHolidays(this.route.snapshot.params['id']).subscribe(
      res => {
        this.holidays = res;
      }, err => {
        console.log(err);
      },
      () => {
        this.areHolidaysLoaded = true;
        this.dataSource = new MatTableDataSource<Holiday>(this.holidays);
        this.checkHolidays();
      }
    );
  }

  fetchTasksByAssignee() {
    this.taskService.fetchTasksByAssignee(this.route.snapshot.params['id']).subscribe(
      res => {
        this.tasks = res;
      }, err => {
        console.log(err);
      },
      () => {
        this.areTasksLoaded = true;
        this.taskDataSource = new MatTableDataSource<Task>(this.tasks);
      }
    );
  }

  isManager(): boolean {
    return this.employee.role.toLocaleString().includes('ADMIN');
  }

  addHolidayRequest() {
    this.router.navigate(['/holidays/add'], {
      queryParams: {
        employeeId: this.route.snapshot.params['id']
      }
    });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.route.snapshot.params['id']);
  }

  isLoaded(): boolean {
    return this.isEmployeeLoaded && this.areHolidaysLoaded;
  }

  sendEmail() {
    this.dialog.open(ReplyDialogComponent, {
      width: '350px',
      data: {email: this.employee.email}
    });
  }

  checkHolidays() {
    const today = new Date();
    if (this.holidays != null) {
      this.holidays.forEach(holiday => {
        if (holiday.approvalState === 'APPROVED') {
          const startDate = new Date(holiday.startDate);
          const endDate = new Date(holiday.startDate);
          endDate.setDate(endDate.getDate() + holiday.duration);
          if (startDate.valueOf() - today.valueOf() <= 0 && endDate.valueOf() - today.valueOf() >= 0) {
            this.endHolidayDate = endDate.toLocaleDateString();
          }
        }
      });
    }
    if (this.endHolidayDate == null) {
      this.holidays.forEach(holiday => {
        if (holiday.approvalState === 'APPROVED') {
          const startDate = new Date(holiday.startDate);
          const endDate = new Date(holiday.startDate);
          endDate.setDate(endDate.getDate() + holiday.duration);
          if (startDate.valueOf() - today.valueOf() >= 0) {
            this.pendingHolidayStart = startDate.toLocaleDateString();
            this.pendingHolidayEnd = endDate.toLocaleDateString();
          }
        }
      });
    }
  }

  isAdmin(): boolean {
    return !this.isUserLoggedIn && this.loggedInUserRole === 'ADMIN';
  }

  manageRequests() {
    this.dialog.open(ManageHolidaysDialogComponent, {
      width: '900px',
      data: {id: this.employee.id}
    });
  }
}
