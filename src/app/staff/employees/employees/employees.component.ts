import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../../services/employee.service';
import {Router} from '@angular/router';
import {Employee} from '../../../types';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Array<Employee>;
  areLoaded: boolean;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private employeeService: EmployeeService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.fetchAllEmployees().subscribe(res => this.employees = res,
      err => this.showError(err),
      () => {
        this.areLoaded = true;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
      });
  }

  fetchEmployee(id: number) {
    this.router.navigate(['/employees', id]);
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/teams']));
  }
}
