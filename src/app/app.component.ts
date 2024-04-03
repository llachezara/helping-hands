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
  subscriptions: Subscription[] = []
  isAuthenticating = true;

  constructor(private auth: AuthService){}

  ngOnInit(): void {

    const userSubscription = this.auth.user$.subscribe({
      next:()=> this.isAuthenticating = false,
      error:(error)=>{
        this.isAuthenticating = false
        console.log("App ngOnInit", error);
      }
    })
    this.subscriptions.push(userSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
