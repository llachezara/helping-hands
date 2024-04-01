import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appIsEmail]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: IsEmailDirective,
    multi: true
  }],
})
export class IsEmailDirective implements Validator{
  regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
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

    return {emailNotValid: true}
  }

}
