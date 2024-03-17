import { Component, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 @ViewChild('loginForm') form: NgForm | undefined;

 errorMessage: string | null = null;
 constructor(private auth: AuthService, private router: Router){}

 onSubmit(){
    //TODO: Validate form
    if (!this.form) {
      return
    }
    const {email, password} = this.form.value;

    this.auth.login(email, password).subscribe({
      next:()=>{
        console.log('Login');
        this.errorMessage = null;
        this.router.navigate(['/home']);
      },
      error:(error)=>{
        this.errorMessage = error.message;
      }
    });
 }
}
