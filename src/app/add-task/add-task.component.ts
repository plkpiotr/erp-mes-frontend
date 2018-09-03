import {Component, OnInit} from '@angular/core';
import {Task, Category, Employee} from '../types';
import {TaskService} from '../task.service';
import {Router} from '@angular/router';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskRequest;
  name: string;
  category: Category;
  assigneeId?: number;
  precedingTaskIds: number[];
  details: string;
  estimatedTimeInMinutes: number;
  deadline: Date;

  assignees: Array<Employee>;
  precedingTasks: Array<Task>;
  categories;

  constructor(private taskService: TaskService, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employeeService.fetchAllEmployees().subscribe(res => this.assignees = res);
    this.taskService.fetchAllTasks().subscribe(res => this.precedingTasks = res);
    this.categories = Object.keys(Category);
  }

  submitForm() {
    this.taskRequest = {
      name: this.name,
      category: Category.TODO,
      assigneeId: this.assigneeId,
      precedingTaskIds: this.precedingTaskIds,
      details: this.details,
      estimatedTimeInMinutes: this.estimatedTimeInMinutes,
      deadline: this.deadline
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
