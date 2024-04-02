import { AbstractControl, ValidationErrors } from '@angular/forms';
const regExp = /(http(s?):\/\/)([.\w|\s-])+([.\w|\s-/])*\.(?:jpg|gif|png)/;

export function ValidateImageUrl(control: AbstractControl): ValidationErrors | null {
  
  if (!regExp.test(control.value)) {
    
    return { invalidImgUrl: true };
  }
  return null
}

