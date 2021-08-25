import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'env'
})
export class EnvPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
