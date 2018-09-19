import {Component, OnInit} from '@angular/core';
import {Employee, Role} from '../../../types';
import {EmployeeService} from '../../../services/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeRequest;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  accountNumber: string;
  daysOffPerYear: number;
  salary: number;
  roles;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit() {
    this.roles = Object.keys(Role);
  }

  submitForm() {
    this.employeeRequest = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      contractRequest: {
        accountNumber: this.accountNumber,
        daysOffPerYear: this.daysOffPerYear,
        salary: this.salary
      }
    };
    let employee: Employee;
    this.employeeService.addEmployee(this.employeeRequest)
      .subscribe(res => {
          employee = res;
        },
        err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/employees', employee.id]);
        });
  }
}
