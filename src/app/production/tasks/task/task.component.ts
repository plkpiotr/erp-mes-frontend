import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category, Task} from '../../../types';
import {ErrorDialogComponent} from '../../../custom/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  task: Task;
  isTaskLoaded = false;
  isDone = Category.DONE;

  constructor(private taskService: TaskService, private route: ActivatedRoute,
              private router: Router, private dialog: MatDialog) { }

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
        this.showError(err, true);
      }, () => {
        this.isTaskLoaded = true;
      });
  }

  setNextCategory() {
    this.taskService.setNextCategory(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.task = res;
      }, err => {
        this.showError(err, false);
      }, () => {
        this.router.navigate(['/tasks']);
      });
  }

  assignToMe() {
    this.taskService.assignToMe(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.task = res;
      }, err => {
        this.showError(err, false);
      }, () => {
        this.router.navigate(['/tasks']);
      });
  }

  seeTask(id: number) {
    this.router.navigate(['/tasks', id]);
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
