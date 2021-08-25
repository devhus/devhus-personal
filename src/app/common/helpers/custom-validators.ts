import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidators {

  // public static isCountry(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const check = csc.getCountryByCode(control.value).name != null
  //     return check == false ? { isCountry: { value: true } } : null;
  //   };
  // }

  // public static isCategory(categories?: CategoryModel[]): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     let check: boolean = false;
  //     if (categories) {
  //       check = categories.map(item => { return item.id }).includes(+control.value);
  //     } else if (CategoriesService.GlobalCategories.length > 0) {
  //       check = CategoriesService.GlobalCategories.map(item => { return item.id }).includes(+control.value);
  //     }
  //     return check == false ? { isCategory: { value: true } } : null;
  //   };
  // }

  // public static isLanguage(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     CONSOLE.log(TranslationService.AppLanguages.map(item => item.code));
  //     const check = TranslationService.AppLanguages.map(item => item.code).includes(control.value);
  //     return check == false ? { isCategory: { value: true } } : null;
  //   };
  // }

  public static inputsMatching(targetControll: AbstractControl | undefined): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const check = targetControll?.value === control.value;
      return check == false ? { inputsMatching: { value: true } } : null;
    };
  }

}