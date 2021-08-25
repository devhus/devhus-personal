import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(array: any[], sortKey: string): any[] {
    return array.sort((a, b) => a[sortKey] - b[sortKey])
  }

}
