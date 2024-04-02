import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CampaignDoc, CampaignEditPartial } from 'src/app/types/Campaign';
import { CampaignService } from '../campaign.service';
import { Timestamp } from 'firebase/firestore';
import { regions } from 'src/app/shared/regions';
import { ValidateTitle } from '../validators/title.validator';
import { ValidateImageUrl } from '../validators/image-url.validator';
import { ValidateDescription } from '../validators/description.validator';
import { ValidatePhoneNumber } from '../validators/phone-number.validator';
import { CustomErrorStateMatcher } from '../custom-state-matcher';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = [];
  campaignHasEnded = false;
  campaignId: string | null | undefined;

  matcher = new CustomErrorStateMatcher();
  regions: String[] = regions;
  minStartDate: Date | undefined;
  maxStartDate: Date |undefined;
  minEndDate: Date | undefined;
  maxEndDate: Date | undefined;

  editForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(64), ValidateTitle]],
    imageUrl: ['', [Validators.required, ValidateImageUrl]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(450), ValidateDescription]],
    startDate: [new Date, [Validators.required]],
    endDate: [new Date, [Validators.required]],
    phoneNumber: ['', [Validators.required, ValidatePhoneNumber]],
    region: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private campaignService: CampaignService, private router: Router) {}

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id');

    const getCampaignSubscription = this.campaignService.getCampaignById(this.campaignId!).subscribe({
      next:(doc)=>{

        const startDate = doc.startDate.toDate();
        const endDate = doc.endDate.toDate();
        console.log(startDate, endDate);

        this.editForm.setValue({
          title: doc.title,
          imageUrl: doc.imageUrl,
          description: doc.description,
          startDate: startDate,
          endDate: endDate,
          phoneNumber: doc.phoneNumber,
          region: doc.region,
        })
        
        this.setDates(startDate, endDate)
      },
      error:(error)=>console.log(error)
    });

    this.subscriptions.push(getCampaignSubscription);
  }

  onSubmit():void {

    if (!this.editForm.valid) {
      return
    }
    
    const newData = this.editForm.value;
    const updateCampaignSubscription = this.campaignService.updateCampaignById(this.campaignId!, newData as CampaignEditPartial).subscribe({
      next: ()=> {
        console.log(`Updated campaign ${this.campaignId}`);
        this.router.navigate([`/campaigns/${this.campaignId}`])
      },
      error: (error)=> console.log(error)
    })

    this.subscriptions.push(updateCampaignSubscription);
  }

  setDates(startDate: Date, endDate: Date){
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0);
    console.log(currentDate);
    

    if (currentDate.getTime() <= startDate.getTime() && currentDate.getTime() <= endDate.getTime()) {
      this.minStartDate = currentDate;

      this.minEndDate = startDate;
      this.maxEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+30);

    } else if(currentDate.getTime() > startDate.getTime() && currentDate.getTime() < endDate.getTime()){
      this.editForm.controls.startDate.disable();

      this.minEndDate = currentDate;
      this.maxEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+30);

    } else if (currentDate.getTime() > startDate.getTime() && currentDate.getTime() > endDate.getTime()){
      this.editForm.disable();
      this.campaignHasEnded = true;
    }
  
  }

  startDateEvent(event: MatDatepickerInputEvent<Date>) {

    if (this.editForm.controls.startDate.invalid) {
      return;
    }

    const startDate = this.editForm.controls.startDate.value;
       
    this.minEndDate = startDate!;
    this.maxEndDate = new Date(this.minEndDate.getFullYear(), this.minEndDate.getMonth(), this.minEndDate.getDate() + 30);

    this.editForm.controls.endDate.setValue(this.minEndDate);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
