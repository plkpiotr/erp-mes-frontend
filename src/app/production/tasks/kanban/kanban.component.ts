import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Task} from '../../../types';
import {TaskService} from '../../../services/task.service';
import {Router} from '@angular/router';
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  myTasks: Array<Task>;
  areMyTasksLoaded = false;

  constructor(private taskService: TaskService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.taskService.fetchTasksByAssignee()
      .subscribe(res => {
      this.myTasks = res;
    }, err => {
      this.showError(err);
    }, () => {
      this.areMyTasksLoaded = true;
    });
  }

  seeTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/tasks']));
  }
}
