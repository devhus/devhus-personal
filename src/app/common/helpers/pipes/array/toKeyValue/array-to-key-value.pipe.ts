import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToKeyValue'
})
export class ArrayToKeyValuePipe implements PipeTransform {

  transform(array: any[] | null, keyPropName: string, valuePropName: string): any {
    if(array == undefined) return null;
    const keyValueObject: {
      [key: string]: string
    } = {};
    
    array.forEach((element: any) => {
      const elmKeys = Object.keys(element);
      if (elmKeys == undefined || elmKeys.length == 0 || !elmKeys.includes(keyPropName))
        return;

      keyValueObject[element[keyPropName]] = element[valuePropName] ?? null;
    });
    return keyValueObject;
  }

}
