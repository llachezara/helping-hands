import { AbstractControl, ValidationErrors } from '@angular/forms';
const regExp = /^[A-Z][\w\s.,;:\-'"?!\(\)]*/;

export function ValidateDescription(control: AbstractControl): ValidationErrors | null {
  
  if (!regExp.test(control.value)) {
    
    return { invalidDescription: true };
  }
  return null
}