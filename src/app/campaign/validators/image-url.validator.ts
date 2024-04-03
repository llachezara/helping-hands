import { AbstractControl, ValidationErrors } from '@angular/forms';
const regExp = /(http(s?):\/\/)([.\w|\s-%])+([.\w|\s-/%])*\.(?:jpg|gif|png|jpeg)/;

export function ValidateImageUrl(control: AbstractControl): ValidationErrors | null {
  
  if (!regExp.test(control.value) && control.value !== "") {
    
    return { invalidImgUrl: true };
  }
  return null
}

