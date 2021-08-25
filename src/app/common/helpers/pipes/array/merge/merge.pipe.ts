import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'merge'
})
export class MergePipe implements PipeTransform {

  transform(array: any[], ...arrays: any[]): any[] {
    let returnArray = [...array];
    for (const carray of arrays) {
      returnArray = [...returnArray, ...carray];
    }
    return returnArray;
  }

}
