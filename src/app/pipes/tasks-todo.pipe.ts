import {Pipe, PipeTransform} from '@angular/core';
import {Category, Task} from '../types';

@Pipe({
  name: 'tasksTodo'
})
export class TasksTodoPipe implements PipeTransform {

  transform(myTasks: Task[]) {
    if (!myTasks) {
      return myTasks;
    }
    return myTasks.filter(task => task.category === Category.TO_DO);
  }

}
