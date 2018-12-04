import {Component, OnInit} from '@angular/core';
import {Task, Employee} from '../../../types';
import {TaskService} from '../../../services/task.service';
import {Router} from '@angular/router';
import {EmployeeService} from '../../../services/employee.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";
import {Type} from "../../../globals";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  taskRequest;
  form: FormGroup;
  areTasksLoaded = false;
  areAssigneesLoaded = false;

  name: FormControl;
  precedingTaskIds: FormControl;
  assigneeId?: FormControl;
  estimatedTime: FormControl;
  deadline: FormControl;
  scheduledTime: FormControl;
  details: FormControl;
  type: FormControl;

  assignees: Array<Employee>;
  precedingTasks: Array<Task>;
  types;

  constructor(private taskService: TaskService, private employeeService: EmployeeService,
              private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.employeeService.fetchAllEmployees().subscribe(res => {
      this.assignees = res;
    }, err => {
      this.showError(err, true);
    }, () => {
      this.areAssigneesLoaded = true;
    });
    this.taskService.fetchAllTasks().subscribe(res => {
      this.precedingTasks = res;
    }, err => {
      this.showError(err, true);
    });
    this.types = Object.keys(Type);
    this.setupFormControls();
    this.form = new FormGroup({
      'name': this.name,
      'precedingTaskIds': this.precedingTaskIds,
      'assigneeId': this.assigneeId,
      'estimatedTime': this.estimatedTime,
      'deadline': this.deadline,
      'scheduledTime': this.scheduledTime,
      'details': this.details,
      'type': this.type
    });
  }

  setupFormControls() {
    this.name = new FormControl('', [
      Validators.maxLength(25),
      Validators.required
    ]);
    this.precedingTaskIds = new FormControl('', []);
    this.assigneeId = new FormControl('', []);
    this.estimatedTime = new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(0),
      Validators.max(120)
    ]);
    this.deadline = new FormControl('', [
      Validators.required
    ]);
    this.scheduledTime = new FormControl('', []);
    this.details = new FormControl('', [
      Validators.maxLength(250),
    ]);
    this.type = new FormControl('', [
      Validators.required
    ]);
  }

  submitForm() {
    console.log(this.form.get('precedingTaskIds'));
    this.taskRequest = {
      name: this.form.get('name').value,
      precedingTaskIds: this.form.get('precedingTaskIds').value,
      assigneeId: this.form.get('assigneeId').value,
      estimatedTime: this.form.get('estimatedTime').value,
      deadline: this.form.get('deadline').value,
      scheduledTime: this.form.get('scheduledTime').value,
      details: this.form.get('details').value,
      type: this.form.get('type').value
    };
    if (this.form.get('precedingTaskIds').value.constructor !== Array) {
      this.taskRequest.precedingTaskIds = [];
    }
    console.log(this.form.get('precedingTaskIds'));
    let task: Task;
    this.taskService.addTask(this.taskRequest)
      .subscribe(res => {
          task = res;
        }, err => {
          this.showError(err, false);
        },
        () => {
          this.router.navigate(['/tasks', task.id]);
        });
  }

  getErrorName() {
    return this.name.hasError('maxLength') ? '' : '0-25 characters';
  }

  getErrorDetails() {
    return this.details.hasError('maxLength') ? '' : '0-250 characters';
  }

  showError(err, redirect: boolean) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });

    if (redirect) {
      dialogRef.afterClosed().subscribe(() => this.router.navigate(['/tasks']));
    }
  }
}
