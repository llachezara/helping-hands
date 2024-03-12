import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthService {
  errorMessage: string | undefined;

  constructor(private firebaseAuth: Auth, private router: Router) {}

  login(email: string, password: string): Observable<void> {
     const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(()=>{});
     
     return from(promise);
  }

  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((data)=> console.log(data));

    return from(promise);
  }

  logout() {
    // localStorage.removeItem('user');
    // this.fireAuth.signOut().then(()=> {
    //   console.log('LOGOUT');
    //   this.router.navigate(['/home']);
    // });
  }

  getUser(){

    return !!localStorage.getItem('user');
  }
}

// this.fireAuth.idToken.subscribe({
//   next:(data)=>{
//     console.log('2', data);
//     //
//   },
//   error:(err)=>{
//     console.log(err);
//   }
// })
