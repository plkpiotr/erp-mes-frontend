import {Component, OnInit} from '@angular/core';
import {ErrorDialogComponent} from '../../../custom/error-dialog/error-dialog.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssignmentRequest, Employee, Task} from '../../../types';
import {TaskService} from '../../../services/task.service';
import {EmployeeService} from '../../../services/employee.service';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  assignmentRequest;
  form: FormGroup;
  areTasksLoaded = false;
  areAssigneesLoaded = false;

  taskIds: FormControl;
  assigneeIds: FormControl;
  startTime: FormControl;
  endTime: FormControl;

  tasks: Array<Task>;
  assignees: Array<Employee>;

  constructor(private dialog: MatDialog, private router: Router, private taskService: TaskService,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.fetchAllEmployees().subscribe(res => {
      this.assignees = res;
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err, true);
      }
    }, () => {
      this.areAssigneesLoaded = true;
    });
    this.taskService.fetchTasksByAssigneeIsNull().subscribe(res => {
      this.tasks = res;
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err, true);
      }
    });
    this.setupFormControls();
    this.form = new FormGroup({
      'taskIds': this.taskIds,
      'assigneeIds': this.assigneeIds,
      'startTime': this.startTime,
      'endTime': this.endTime
    });
  }

  setupFormControls() {
    this.taskIds = new FormControl('', [
      Validators.required
    ]);
    this.assigneeIds = new FormControl('', [
      Validators.required
    ]);
    this.startTime = new FormControl('', [
      Validators.required
    ]);
    this.endTime = new FormControl('', [
      Validators.required
    ]);
  }

  submitForm() {
    this.assignmentRequest = {
      taskIds: this.form.get('taskIds').value,
      assigneeIds: this.form.get('assigneeIds').value,
      startTime: this.form.get('startTime').value,
      endTime: this.form.get('endTime').value
    };
    let assignmentRequests: AssignmentRequest[];
    this.taskService.assignToEmployees(this.assignmentRequest)
      .subscribe(res => {
        assignmentRequests = res;
      }, err => {
        if (err.status == 401) {
          this.router.navigate(['/login']);
        } else {
          this.showError(err, false);
        }
      }, () => {
        this.router.navigate(['/tasks']);
      });
  }

  showError(err, redirect: boolean) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    if (redirect) {
      dialogRef.afterClosed().subscribe(() => this.router.navigate(['/tasks']));
    }
  }
}
