import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {Router} from '@angular/router';
import {Task} from '../../../types';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Array<Task>;
  areTasksLoaded = false;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.fetchAllTasks().subscribe(res => {
      this.tasks = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areTasksLoaded = true;
    });
  }

  seeTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  addTask() {
    this.router.navigate(['/tasks/add']);
  }
}
