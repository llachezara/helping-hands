import { Injectable, OnDestroy} from '@angular/core';
import {Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, user} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subscription, from, map} from 'rxjs';
import { UserInterface } from '../types/User';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements OnDestroy{
  userSubscription: Subscription
  user$ = user(this.firebaseAuth).pipe(
    map((user)=>{
      let newUser: UserInterface | null = user ? {email: user.email!, uid: user.uid!} : user;
      return newUser;
    })
  );

  currentUser: UserInterface | null | undefined;

  get isLoggedIn(){
    return !!this.currentUser;
  }

  constructor(private firebaseAuth: Auth, private router: Router, private userService: UserService) {
    this.userSubscription = this.user$.subscribe((user)=> {this.currentUser = user})
  }
  
  login(email: string, password: string): Observable<void> {
     const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then((data)=>{console.log("Login", data)});
     
     return from(promise);
  }

  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((data)=>{
        return this.userService.createUserProfile(data)
      })
      
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
