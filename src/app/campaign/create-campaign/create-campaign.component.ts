import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { Router } from '@angular/router';
import { ValidateImageUrl } from '../validators/image-url.validator';
import { CustomErrorStateMatcher } from '../custom-state-matcher';
import { ValidateTitle } from '../validators/title.validator';
import { ValidateDescription } from '../validators/description.validator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ValidatePhoneNumber } from '../validators/phone-number.validator';
import { regions } from 'src/app/shared/regions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnDestroy{
  subscriptions: Subscription[] = [];
  matcher = new CustomErrorStateMatcher();
  regions: String[] = regions;
  
  minStartDate: Date;
  minEndDate: Date;
  maxEndDate: Date;

  createForm = this.fb.group({
    title:['', [Validators.required, Validators.minLength(10), Validators.maxLength(64), ValidateTitle]],
    imageUrl: ['', [Validators.required, ValidateImageUrl]],
    description:['', [Validators.required, Validators.minLength(20), Validators.maxLength(450), ValidateDescription]],
    startDate:[ new Date(), [Validators.required]],
    endDate:[new Date(), [Validators.required]],
    phoneNumber:['', [Validators.required, ValidatePhoneNumber]],
    region:['', Validators.required]
  })
  constructor(private fb: FormBuilder, private campaignService: CampaignService, private router: Router){
    const currentDay = new Date().getDay();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.maxEndDate = new Date(currentYear, currentMonth, currentDay + 30);

  }

  onSubmit():void{
    console.log(this.createForm.value)

    const createSubscription = this.campaignService.createCampaign(this.createForm.value).subscribe({
      next:()=>{
        console.log("Created campaign");
        this.router.navigate(['/campaigns']);
      },
      error:(error)=> console.log('Error on create campaign', error)
    });

    this.subscriptions.push(createSubscription);
  }

  startDateEvent(event: MatDatepickerInputEvent<Date>) {

   if (this.createForm.controls.startDate.valid) {
      const startDate = this.createForm.controls.startDate.value;
      
      this.minEndDate = startDate!;
      this.maxEndDate = new Date(this.minEndDate.getFullYear(), this.minEndDate.getMonth(), this.minEndDate.getDay() + 30);

      this.createForm.controls.endDate.setValue(this.minEndDate)
   }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
