import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailMask'
})
export class EmailMaskPipe implements PipeTransform {

  transform(value: string, fullMask: boolean = false): string {
    return value.replace('@', '[at]');
  }

}
