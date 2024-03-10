import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  errorMessage: string | undefined;
  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  login(credentials: {email: string , password: string}) {
    const {email, password} = credentials;

     this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error.message);
        this.errorMessage = error.message;
      });
  }
}
