import { AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";


export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
        if (!control) {
            return false
        }
       const isInvalidImg = control.invalid && control.touched;
       
        return isInvalidImg
    }
  }