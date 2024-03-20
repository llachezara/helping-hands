import { Injectable, signal } from '@angular/core';
import {Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, user} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from, map} from 'rxjs';
import { UserInterface } from '../types/User';

@Injectable()
export class AuthService {
  constructor(private firebaseAuth: Auth, private router: Router) {}

  user$ = user(this.firebaseAuth).pipe(
    map((user)=>{
      let newUser: UserInterface | null = user ? {email: user.email!} : user;
      return newUser
    })
  );

  get currentUser():string | null{
    console.log(localStorage.getItem('user'));
    
    return localStorage.getItem('user');
  }

  get isLoggedIn(){
    return !!this.currentUser;
  }
  
  login(email: string, password: string): Observable<void> {
     const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then((data)=>{
      localStorage.setItem('user', JSON.stringify(data.user.email));
     });
     
     return from(promise);
  }

  register(email: string, password: string): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password);
      
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    return from(promise);
  }

}
