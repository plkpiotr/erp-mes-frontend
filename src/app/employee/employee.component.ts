import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../types";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private employee: Employee;
  private isLoaded = false;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchEmployee();
  }

  fetchEmployee() {
    this.employeeService.fetchOneEmployee(this.route.snapshot.params['id']).subscribe(
      res => {
        this.employee = res;
      }, err => {
        console.log(err);
      },
      () => {
        this.isLoaded = true;
      }
    );
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.route.snapshot.params['id']);
  }

}
