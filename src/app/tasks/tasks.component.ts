import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category, Task} from '../types';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Array<Task>;
  isLoaded = false;

  constructor(private taskService: TaskService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.taskService.fetchAllTasks().subscribe(res => {
      this.tasks = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isLoaded = true;
    });
  }

  fetchTasks() {
    this.taskService.fetchAllTasks().subscribe(res => this.tasks = res);
  }

}
