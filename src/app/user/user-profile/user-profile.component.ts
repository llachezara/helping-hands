import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CampaignService } from 'src/app/campaign/campaign.service';
import { UserPopulatedDoc } from 'src/app/types/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  user$: Observable<UserPopulatedDoc> | undefined
  constructor(private campaignService: CampaignService){}

  ngOnInit(): void {
    this.user$ = this.campaignService.getCurrentUserPopulatedWithCampaignsDoc();
  }

}
