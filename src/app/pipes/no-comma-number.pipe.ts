import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noCommaNumber'
})
export class NoCommaNumberPipe implements PipeTransform {

  transform(value: number): string {
    if (value !== undefined && value !== null) {
      return value.toString().replace(",", " ");
    } else {
      return "";
    }
  }

}
