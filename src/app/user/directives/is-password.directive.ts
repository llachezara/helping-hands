import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appIsPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: IsPasswordDirective,
    multi: true
  }],
})
export class IsPasswordDirective implements Validator{
  regExp = /^(?=.*\S).{6,}$/
  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!control.value) {
        return null
    }
    const value = control.value.trim();
    const match = this.regExp.test(value)
    if (match) {
      return null
    }

    return {passNotValid: true}
  }

}