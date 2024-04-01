import { Component, OnDestroy, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{
 @ViewChild('loginForm') form: NgForm | undefined;
 subscriptions: Subscription[] = [];

 errorMessage: string | null = null;
 constructor(private auth: AuthService, private router: Router){}

 onSubmit(){
    if (!this.form) {
      return
    }
    const {email, password} = this.form.value;

    const loginSubscription = this.auth.login(email, password).subscribe({
      next:()=>{
        console.log('Login');
        this.errorMessage = null;
        this.router.navigate(['/home']);
      },
      error:(error)=>{
        this.errorMessage = "Invalid email or password";
        this.form!.resetForm({email: email, password: ''})
        setTimeout(()=>{
          this.errorMessage = ""
        }, 5000);
      }
    });

    this.subscriptions.push(loginSubscription);
 }

 ngOnDestroy(): void {
   this.subscriptions.forEach(subscription => subscription.unsubscribe());
 }
}
