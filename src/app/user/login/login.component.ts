import { Component, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 @ViewChild('loginForm') form!: NgForm;
 //TODO: Add errorMessage property
 userCredentials: {email: string , password: string} = {email:'', password:''};

 constructor(private auth: AuthService){}

 onSubmit(){
    //TODO: Validate form
    this.userCredentials = this.form.value;
    console.log(this.form.value);
    this.auth.login(this.userCredentials);
 }
}
