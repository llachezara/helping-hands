import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { CampaignDoc } from 'src/app/types/Campaign';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit{
  campaign$: Observable<CampaignDoc> | undefined = undefined;
  constructor(private route: ActivatedRoute, private campaignService: CampaignService){}

  ngOnInit(): void {
    const campaignId = this.route.snapshot.paramMap.get('id');

    this.campaign$ = this.campaignService.getCampaignById(campaignId);
  }

}