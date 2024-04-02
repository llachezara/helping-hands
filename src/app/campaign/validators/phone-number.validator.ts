import { AbstractControl, ValidationErrors } from '@angular/forms';
const regExp = /^(08)[\d]{8}$/;

export function ValidatePhoneNumber(control: AbstractControl): ValidationErrors | null {

  if (!regExp.test(control.value)) {
    
    return { invalidNumber: {requiredLength: 10} };
  }
  return null
}