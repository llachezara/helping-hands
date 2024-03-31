import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CampaignService } from 'src/app/campaign/campaign.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent{

  constructor(private campaignService: CampaignService){}

}
