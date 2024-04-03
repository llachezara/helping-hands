import { Component, OnDestroy, OnInit,} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CampaignService } from '../campaign.service';
import { Observable, Subscription, tap } from 'rxjs';
import { DocumentData } from 'firebase/firestore';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = [];
  isLoading = true;
  itemsPerPage: number = 10;
  pageIndex: number = 0;
  campaigns: DocumentData[] | undefined = undefined;

  constructor(private campaignService: CampaignService){}

  ngOnInit(): void {
    this.getCampaigns()
  }

    const {pageSize, pageIndex} = event;
  getServerData(event: PageEvent){
      console.log("PAG EVENT", event);
      const {pageSize, pageIndex} = event;

      if (pageSize !== this.itemsPerPage) {
        this.itemsPerPage = pageSize;
      }

      if(pageIndex !== this.pageIndex){
        this.pageIndex = pageIndex;
      }
  }
  
  getCampaigns(){
    const getAllSubscription = this.campaignService.getAllCampaigns().subscribe({
      next:(campaigns)=>{ 
        this.campaigns = campaigns;
        this.isLoading = false;
      },
      error:(error)=>{console.log(error)}
    });

    this.subscriptions.push(getAllSubscription);
  }

  ngOnDestroy():void{
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
