import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";
import {Employee} from "../types";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Array<Employee>;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.fetchAllEmployees().subscribe(res => this.employees = res);
  }

  fetchEmployee(id: number) {
    this.router.navigate(['/employees', id]);
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

}
