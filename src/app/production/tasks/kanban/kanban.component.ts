import {Component, OnInit} from '@angular/core';
import {Employee, Task} from '../../../types';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorDialogComponent} from '../../../custom/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';
import {EmployeeService} from '../../../services/employee.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  employees: Array<Employee>;
  tasks: Array<Task>;
  areEmployeesLoaded = false;
  areTasksLoaded = false;
  currentId: number;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute,
              private dialog: MatDialog, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.fetchKanban();
      }
    );
  }

  fetchKanban() {
    this.currentId = +this.route.snapshot.params['id'];
    this.employeeService.fetchAllEmployees()
      .subscribe(res => {
        this.employees = res;
      }, err => {
        this.showError(err);
      }, () => {
        this.areEmployeesLoaded = true;
      });
    this.taskService.fetchTasksByAssignee(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.tasks = res;
      }, err => {
        this.showError(err);
      }, () => {
        this.areTasksLoaded = true;
      });
  }

  seeTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  seeKanban(id: number) {
    this.router.navigate(['/kanban', id]);
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/tasks']));
  }
}
