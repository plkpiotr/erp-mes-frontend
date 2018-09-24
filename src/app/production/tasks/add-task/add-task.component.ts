import {Component, OnInit} from '@angular/core';
import {Task, Employee, Type} from '../../../types';
import {TaskService} from '../../../services/task.service';
import {Router} from '@angular/router';
import {EmployeeService} from '../../../services/employee.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  taskRequest;
  name: string;
  assigneeId?: number;
  precedingTaskIds: number[];
  details: string;
  estimatedTimeInMinutes: number;
  deadline: Date;
  type: Type;
  reference: number;
  scheduledTime: Date;

  assignees: Array<Employee>;
  precedingTasks: Array<Task>;
  types;

  constructor(private taskService: TaskService, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employeeService.fetchAllEmployees().subscribe(res => this.assignees = res);
    this.taskService.fetchAllTasks().subscribe(res => this.precedingTasks = res);
    this.types = Object.keys(Type);
  }

  submitForm() {
    this.taskRequest = {
      name: this.name,
      assigneeId: this.assigneeId,
      precedingTaskIds: this.precedingTaskIds,
      details: this.details,
      estimatedTimeInMinutes: this.estimatedTimeInMinutes,
      deadline: this.deadline,
      type: this.type,
      reference: this.reference,
      scheduledTime: this.scheduledTime
    };
    let task: Task;
    this.taskService.addTask(this.taskRequest)
      .subscribe(res => {
        task = res;
      },
        err => {
        console.log(err);
        },
        () => {
        this.router.navigate(['/tasks', task.id]);
        });
  }
}
