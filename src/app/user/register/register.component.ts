import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('registerForm') form!: NgForm;

  errorMessage: string | null = null;
  // passMismatch: boolean = false;
 
  constructor(private authService: AuthService, private router: Router){}
  onSubmit() {
     //TODO: Validate form
     const {email, password} = this.form.value;
     const rePassword = this.form.value.rePassword;

     if (password !== rePassword) {
        console.log(password, rePassword,'MissMatch');
        this.errorMessage = 'Passwords must match';
        console.log(this.errorMessage);
     } else {

        this.authService.register(email, password).subscribe({
          next: ()=> {
            console.log('Registered');
            this.errorMessage = null;
            this.router.navigate(['/home']);
          },
          error: (error)=> {
            console.log(error);
            this.errorMessage = error.message;
          }
      });
     }
  }
}
