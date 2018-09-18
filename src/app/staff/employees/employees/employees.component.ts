import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../services/employee.service';
import {Router} from '@angular/router';
import {Employee} from '../../../types';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Array<Employee>;
  visibleEmployees: Array<Employee>;

  employeesPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.fetchAllEmployees().subscribe(res => this.employees = res,
      err => console.log(err),
      () => {
        this.setVisibleEmployees();
        this.setPageNumbers();
      });
  }

  fetchEmployee(id: number) {
    this.router.navigate(['/employees', id]);
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

  setVisibleEmployees() {
    const pageIndex = (this.selectedPage - 1) * this.employeesPerPage;
    this.visibleEmployees = this.employees.slice(
      pageIndex,
      pageIndex + this.employeesPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.employees.length / this.employeesPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisibleEmployees();
  }

}
