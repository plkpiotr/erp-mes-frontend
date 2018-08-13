import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../types';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: Task;
  isLoaded = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskService.fetchOneTask(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.task = res;
      },
        err => {
          console.log(err);
        },
        () => {
        this.isLoaded = true;
        });
  }
}
