import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Task} from '../../../types';
import {TaskService} from '../../../services/task.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  myTasks: Array<Task>;
  areMyTasksLoaded = false;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.taskService.fetchTasksByAssignee()
      .subscribe(res => {
      this.myTasks = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areMyTasksLoaded = true;
    });
  }

  seeTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }
}
