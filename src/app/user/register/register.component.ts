import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('registerForm') form!: NgForm;
  //TODO: Add errorMessage property
  userCredentials: {email: string, password: string} = {email:'', password:''};
  // passMismatch: boolean = false;
 
  constructor(private auth: AuthService){}
  onSubmit() {
     //TODO: Validate form
     this.userCredentials = this.form.value;
     const rePassword = this.form.value.rePassword;
     const password = this.userCredentials.password;

     if (password !== rePassword) {
        console.log('MissMatch');
        // return this.passMismatch = true;
     }

     console.log(this.form.value);
     this.auth.register(this.userCredentials);
    //  return this.passMismatch
  }
}
