import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn:'root'
})
export class isAuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.authService.user$.pipe(map((user)=> {
      if(!user) this.router.navigate(['/404']);
      return !!user
    }));
  }
}
