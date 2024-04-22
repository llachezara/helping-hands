import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./user/auth.service";
import { Observable, combineLatest, firstValueFrom, from, lastValueFrom, map, of, tap } from "rxjs";
import { isAuthGuard } from "./user/guards/is-auth.guard";
import { isGuestGuard } from "./user/guards/is-guest.guard";
import { isCampaignOwnerGuard } from "./campaign/guards/is-campaign-owner.guard";
import { CampaignService } from "./campaign/campaign.service";

@Injectable({
  providedIn:'root'
})
export class MasterGuard implements CanActivate{
  route: ActivatedRouteSnapshot | undefined;
  state: RouterStateSnapshot | undefined;
  guards: string[] | undefined;
  
  constructor(private authService: AuthService, private campaignService: CampaignService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.route = route;
    this.state = state;

    this.guards = route.data['guards'];
 
    return from(this.executeGuards());
  }


    //Execute the guards sent in the route data 
    private executeGuards(guardIndex: number = 0): Promise<boolean> {
       return this.activateGuard(this.guards![guardIndex]).then((bool)=>{
        console.log("WORKING"); 
                if (guardIndex < this.guards!.length - 1) {
                    return this.executeGuards(guardIndex+1)
                } else {
                    return Promise.resolve(bool);
                }
        }).catch(()=>{ 
          console.log("IN CATCH"); 
          return Promise.reject(false)
        })
        
    }

  //Create an instance of the guard and fire canActivate method returning a observable
  private activateGuard(guardKey: string): Promise<boolean> {

    let guard: isAuthGuard | isGuestGuard | isCampaignOwnerGuard = {} as isAuthGuard;

      switch (guardKey) {
          case "isAuthGuard":
              guard = new isAuthGuard(this.authService, this.router);
              break;
          case "isGuestGuard":
              guard = new isGuestGuard(this.authService, this.router);
              break;
          case "isCampaignOwnerGuard":
              guard = new isCampaignOwnerGuard(this.campaignService, this.router);
              break;
          default:
              break;
      }

      return firstValueFrom(guard.canActivate(this.route!, this.state!) as Observable<boolean>);
  }
}
