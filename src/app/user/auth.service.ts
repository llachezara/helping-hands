import { Injectable, signal } from '@angular/core';
import {Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, user} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../types/User';

@Injectable()
export class AuthService {
  constructor(private firebaseAuth: Auth, private router: Router) {}

  user$ = user(this.firebaseAuth);
  currentUser: UserInterface | null | undefined = undefined;
  
  login(email: string, password: string): Observable<void> {
     const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(()=>{});
     
     return from(promise);
  }

  register(email: string, password: string): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password);
      
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }

}
