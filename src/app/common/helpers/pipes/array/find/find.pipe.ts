import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(array: any[], key: string, matchValue: string): any {
    return array.find(item => item[key] === matchValue);
  }

}
