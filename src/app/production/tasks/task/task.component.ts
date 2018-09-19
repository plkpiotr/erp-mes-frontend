import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../../../types';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: Task;
  isTaskLoaded = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchTask();
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
}
