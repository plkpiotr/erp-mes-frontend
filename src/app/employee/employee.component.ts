import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Employee, Holiday, Task} from '../types';
import {ActivatedRoute, Router} from '@angular/router';
import {HolidayService} from '../holiday.service';
import {TaskService} from '../task.service';
import {LoginService} from "../login.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: Employee;
  subordinates: Employee[];
  tasks: Task[];
  holidays: Holiday[];
  holidayRequests: Holiday[];
  isEmployeeLoaded = false;
  areTasksLoaded = false;
  areHolidaysLoaded = false;
  areRequestsLoaded = false;
  areSubordinatesLoaded = false;
  showRequests = false;
  isUserLoggedIn = false;

  constructor(private employeeService: EmployeeService,
              private taskService: TaskService,
              private holidayService: HolidayService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.loginService.fetchUser().subscribe(res => {
      if (res.id.toString() === this.route.snapshot.params['id']) {
        this.fetchEmployee();
        this.fetchTasksByAssignee();
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
        if (this.isManager()) {
          this.holidayService.fetchHolidaysToApprove(this.route.snapshot.params['id']).subscribe(
            res => {
              this.holidayRequests = res;
            }, err => {
              console.log(err);
            }, () => {
              this.areRequestsLoaded = true;
            }
          );

          this.employeeService.fetchSubordinates(this.route.snapshot.params['id']).subscribe(res => {
            this.subordinates = res;
          }, err => {
            console.log(err);
          }, () => {
            this.areSubordinatesLoaded = true;
          });
        } else {
          this.areRequestsLoaded = true;
        }
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
        if (this.isManager()) {
          this.employeeService.fetchSubordinates(this.route.snapshot.params['id']).subscribe(res => {
            this.subordinates = res;
          }, err => {
            console.log(err);
          }, () => {
            this.areSubordinatesLoaded = true;
          });
        }
        this.areRequestsLoaded = true;
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
    return this.isEmployeeLoaded && this.areHolidaysLoaded && this.areRequestsLoaded;
  }

  hasRequests(): boolean {
    return this.holidayRequests.length !== 0;
  }

  approve(holidayId: number, employeeId: number) {
    this.holidayService.manageHolidays(this.route.snapshot.params['id'], employeeId, holidayId, 'true')
      .subscribe(
        () => {},
        err => {
          console.log(err);
        }, () => {
          this.isEmployeeLoaded = false;
          this.areHolidaysLoaded = false;
          this.areRequestsLoaded = false;
          this.fetchEmployee();
          this.fetchHolidays();
        }
      );
  }

  decline(holidayId: number, employeeId: number) {
    this.holidayService.manageHolidays(this.route.snapshot.params['id'], employeeId, holidayId, 'false')
      .subscribe(
        () => {},
        err => {
          console.log(err);
        }, () => {
          this.isEmployeeLoaded = false;
          this.areHolidaysLoaded = false;
          this.areRequestsLoaded = false;
          this.fetchEmployee();
          this.fetchHolidays();
        }
      );
  }

  hasSubordinates(): boolean {
    return this.areSubordinatesLoaded && this.subordinates.length > 0;
  }
}
