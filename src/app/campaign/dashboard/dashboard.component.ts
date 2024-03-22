import { Component, OnInit,} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CampaignService } from '../campaign.service';
import { Observable, tap } from 'rxjs';
import { DocumentData } from 'firebase/firestore';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  itemsPerPage: number = 10;
  pageIndex: number = 0;
  campaigns$: Observable<DocumentData[]> | undefined = undefined;

  constructor(private campaignService: CampaignService){}

  ngOnInit(): void {
    this.getCampaigns()
  }

  getPaginatorData(event: PageEvent){
    const {pageSize, pageIndex} = event;
    this.itemsPerPage = pageSize;
    this.pageIndex = pageIndex;

    this.getCampaigns()
  }
  
  getCampaigns(){
    this.campaigns$ = this.campaignService.getAllCampaigns();
    console.log(this.campaigns$);
    
  }
}
