import {Component, OnInit} from '@angular/core';
import {Task, Employee, Type} from '../../../types';
import {TaskService} from '../../../services/task.service';
import {Router} from '@angular/router';
import {EmployeeService} from '../../../services/employee.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  now = Date.now();

  name: FormControl;
  precedingTaskIds: FormControl;
  assigneeId?: FormControl;
  estimatedTime: FormControl;
  deadline: FormControl;
  scheduledTime: FormControl;
  details?: FormControl;
  type?: FormControl;

  assignees: Array<Employee>;
  precedingTasks: Array<Task>;
  types;

  constructor(private taskService: TaskService, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employeeService.fetchAllEmployees().subscribe(res => {
      this.assignees = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areAssigneesLoaded = true;
    });
    this.taskService.fetchAllTasks().subscribe(res => {
      this.precedingTasks = res;
    }, err => {
      console.log(err);
    });
    this.types = Object.keys(Type);
    this.setupFormControls();
    this.form = new FormGroup({
      'name': this.name,
      'precedingTaskIds': this.precedingTaskIds,
      'assigneeId': this.assigneeId,
      'estimatedTime': this.name,
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
      Validators.maxLength(25),
    ]);
    this.type = new FormControl('', []);
  }

  submitForm() {
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
    let task: Task;
    this.taskService.addTask(this.taskRequest)
      .subscribe(res => {
        task = res;
      }, err => {
        console.log(err);
        },
        () => {
        this.router.navigate(['/tasks', task.id]);
        });
  }

  getErrorName() {
    return this.name.hasError('maxLength') ? '' : 'Maximum 25 characters';
  }

  getErrorDetails() {
    return this.details.hasError('maxLength') ? '' : 'Maximum 250 characters';
  }

  getErrorEstimatedTime() {
    return this.estimatedTime.hasError('min') ? 'dd' : 'Więcej niż zero';
  }
}
