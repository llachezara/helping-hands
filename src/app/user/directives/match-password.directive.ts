import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchPasswords]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordsDirective,
    multi: true
  }],
  exportAs: 'appMatchPasswords'
})
export class MatchPasswordsDirective implements Validator{

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const {password, rePassword} = control.value;
    
    if (password !== rePassword) {      
      return {mismatch: true}
    }
    
    return null
  }

}