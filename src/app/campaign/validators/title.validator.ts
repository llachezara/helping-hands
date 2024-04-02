import { AbstractControl, ValidationErrors } from '@angular/forms';
const regExp = /^[A-Z][\w\s]*/;

export function ValidateTitle(control: AbstractControl): ValidationErrors | null {
  
  if (!regExp.test(control.value)) {
    
    return { invalidTitle: true };
  }
  return null
}