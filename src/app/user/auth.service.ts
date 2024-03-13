import { Injectable, signal } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../types/User';

@Injectable()
export class AuthService {
  constructor(private firebaseAuth: Auth, private router: Router) {}

  user$ = user(this.firebaseAuth);
  currentUser = signal<UserInterface | null | undefined>(undefined);
  
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

}
