import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  errorMessage: string | undefined;

  constructor(private auth: Auth, private router: Router) {
  }

  login(credentials: {email: string , password: string}) {
    const {email, password} = credentials;

    //  this.fireAuth.signInWithEmailAndPassword(email, password)
    //   .then((data) => {
    //     console.log("Login", data);
    //     this.router.navigate(['/home']);

    //     this.fireAuth.currentUser
    //     .then((user)=>{
    //       console.log('CurrentUser', user)
    //     })
    //     .catch((err)=>{
    //       console.log(err);
    //     })
        

    //   })
    //   .then((token)=> {
    //     console.log(token);
    //     localStorage.setItem('user', JSON.stringify(token))
    //     this.router.navigate(['/home']);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //     this.errorMessage = error.message;
    //   });

       
  }

  register(credentials: {email: string , password: string}) {

    const {email, password} = credentials;
    
    //  this.fireAuth.createUserWithEmailAndPassword(email, password)
    //   .then((data) => {
    //     return data.user?.getIdToken();
    //   })
    //   .then((token)=> {
    //     localStorage.setItem('user', JSON.stringify(token))
    //     this.router.navigate(['/home']);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

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
