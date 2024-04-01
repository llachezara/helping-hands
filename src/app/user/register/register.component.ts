import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserCredential } from 'firebase/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{
  @ViewChild('registerForm') form: NgForm | undefined;
  errorMessage: string | null = null;
  subscriptions: Subscription[] = [];
  
  constructor(private authService: AuthService, private router: Router){}

  onSubmit() {
     if (!this.form) {
       return
     }
     
     const {email, passGroup} = this.form.value;
     const {password, rePassword} = passGroup;

    const registerSubscription = this.authService.register(email, password).subscribe({
        next: ()=> {
          console.log('Registered');
          this.errorMessage = null;
          this.router.navigate(['/home']);
        },
        error: (error)=> {
          console.log(error);
          this.errorMessage = error.message;
          this.form!.resetForm({email: email, password: ''})
          setTimeout(()=>{
            this.errorMessage = ""
          }, 5000);
        }
    });

    this.subscriptions.push(registerSubscription);
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}

