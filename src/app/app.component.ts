import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';
import { UserInterface } from './types/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'helping-hands';

  constructor(private auth: AuthService){}
  ngOnInit(): void {

    this.auth.user$.subscribe({
      next: (user) => {
          let newUser: UserInterface | null = user ? {email: user.email!} : user;
          this.auth.currentUser = newUser;
      }
    })
  }
}
