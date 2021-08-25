import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes'
})
export class ArrayIncludesPipe implements PipeTransform {

  transform(array?: any[] | null, searchValue?: any): boolean {
    if (!array || searchValue === undefined) return false;
    if (array.length === 0) return false;

    return array.includes(searchValue);
  }

}
