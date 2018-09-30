import { Pipe, PipeTransform } from '@angular/core';
import {Category, Task} from '../types';

@Pipe({
  name: 'tasksDone'
})
export class TasksDonePipe implements PipeTransform {

  transform(myTasks: Task[]) {
    if (!myTasks) {
      return myTasks;
    }
    return myTasks.filter(task => task.category === Category.DONE);
  }

}
