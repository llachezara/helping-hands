import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { CampaignService } from "../campaign.service";

@Injectable()
export class isCampaignOwnerGuard implements CanActivate{
  constructor( private campaignService: CampaignService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const id = route.paramMap.get('id');
    
    return this.campaignService.checkIfCurrentUserIsCampaignOwner(id!).pipe(map((boolean)=> {
      if(!boolean) this.router.navigate(['/404']);
      return !!boolean
    }));
  }
}
