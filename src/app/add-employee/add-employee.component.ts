import {Component, OnInit} from '@angular/core';
import {Employee, Role} from "../types";
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";

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
      role: this.role
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
