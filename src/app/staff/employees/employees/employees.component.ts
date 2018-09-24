import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../services/employee.service';
import {Router} from '@angular/router';
import {Employee} from '../../../types';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Array<Employee>;
  visibleEmployees: Array<Employee>;
  areLoaded: boolean;

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.fetchAllEmployees().subscribe(res => this.employees = res,
      err => console.log(err),
      () => {
        this.areLoaded = true;
      });
  }

  fetchEmployee(id: number) {
    this.router.navigate(['/employees', id]);
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }
}
