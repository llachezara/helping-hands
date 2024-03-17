import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

  errorMessage: string | null = null;
 
  constructor(private authService: AuthService, private router: Router){}
  onSubmit() {
     //TODO: Validate form
     if (!this.form) {
       return
     }
     
     const {email, passGroup} = this.form.value;
     const {password, rePassword} = passGroup;

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
