import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'enumeration'
})
export class EnumerationPipe implements PipeTransform {

  transform(word: string): string {
    if (word !== undefined && word !== null) {
      word = word[0].toUpperCase() + word.substr(1).toLowerCase();
      return word.toString().replace('_', ' ');
    } else {
      return '';
    }
  }

}
