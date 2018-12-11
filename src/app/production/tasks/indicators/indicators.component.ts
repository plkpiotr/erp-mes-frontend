import {Component, OnInit} from '@angular/core';
import {ErrorDialogComponent} from '../../../custom/error-dialog/error-dialog.component';
import {Employee, Indicators} from '../../../types';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {EmployeeService} from '../../../services/employee.service';
import {TaskService} from '../../../services/task.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  employees: Array<Employee>;
  indicators: Indicators;
  areEmployeesLoaded = false;
  areIndicatorsLoaded = false;
  currentId: number;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog,
              private employeeService: EmployeeService, private taskService: TaskService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.fetchIndicators();
      }
    );
  }

  fetchIndicators() {
    this.currentId = +this.route.snapshot.params['id'];
    this.employeeService.fetchAllEmployees()
      .subscribe(res => {
        this.employees = res;
      }, err => {
        this.showError(err);
      }, () => {
        this.areEmployeesLoaded = true;
      });
    this.taskService.fetchIndicators(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.indicators = res;
      }, err => {
        this.showError(err);
      }, () => {
        this.areIndicatorsLoaded = true;
      });
  }

  seeIndicators(id: number) {
    this.router.navigate(['/indicators', id]);
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/employees']));
  }
}
