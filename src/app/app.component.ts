import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';
import { UserInterface } from './types/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'helping-hands';
  userSubscription: Subscription | undefined
  isAuthenticating = true;

  constructor(private auth: AuthService){}

  ngOnInit(): void {

    this.userSubscription = this.auth.user$.subscribe({
      next:()=> this.isAuthenticating = false,
      error:(error)=>{
        this.isAuthenticating = false
        console.log("App ngOnInit", error);
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
