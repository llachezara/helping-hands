import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from 'src/app/user/auth.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  menuToggled = false;

  isToggled(drawer: MatSidenav){
    this.menuToggled = !this.menuToggled;
    console.log(drawer);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  get loggedInUser(){
    return this.auth.isLoggedIn;
  }
  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    console.log('In nav onInit')
  }

  logout(){
    this.auth.logout().subscribe({
      next:()=>{ 
        this.router.navigate(['/home']);
        console.log('Logout');
      }
    });
  }
}
