import {Pipe, PipeTransform} from '@angular/core';
import {Task} from '../types';
import {Category} from '../globals';

@Pipe({
  name: 'tasksDoing'
})
export class TasksDoingPipe implements PipeTransform {

  transform(myTasks: Task[]) {
    if (!myTasks) {
      return myTasks;
    }
    return myTasks.filter(task => task.category === Category.DOING);
  }

}
