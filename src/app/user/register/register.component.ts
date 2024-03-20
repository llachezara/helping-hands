import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

  errorMessage: string | null = null;
 
  constructor(private authService: AuthService, private router: Router, private userService: UserService){}

  createUser(data: UserCredential){
    this.userService.createUserProfile(data).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(error)=>{
        console.log(error);
        this.errorMessage = error.message;
      }
  })
  }
  onSubmit() {
     //TODO: Validate form
     if (!this.form) {
       return
     }
     
     const {email, passGroup} = this.form.value;
     const {password, rePassword} = passGroup;

    this.authService.register(email, password).subscribe({
        next: (data)=> {
          console.log('Registered', data);
          localStorage.setItem('user', JSON.stringify(data.user.email));
          this.createUser(data);
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

