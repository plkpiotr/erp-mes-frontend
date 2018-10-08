import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category, Task} from '../../../types';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  task: Task;
  isTaskLoaded = false;
  isDone = Category.DONE;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.fetchTask();
      }
    );
  }

  fetchTask() {
    this.taskService.fetchOneTask(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.task = res;
      }, err => {
        console.log(err);
      }, () => {
        this.isTaskLoaded = true;
      });
  }

  submitForm() {
    this.taskService.setNextCategory(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.task = res;
      }, err => {
        console.log(err);
      }, () => {
        this.router.navigate(['/tasks']);
      });
  }

  seeTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }
}
