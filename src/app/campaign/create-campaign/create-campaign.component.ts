import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent {
  regions = ["Blagoevgrad", "Vidin"]

  createForm = this.fb.group({
    title:['', Validators.required],
    imageUrl: ['', Validators.required],
    description:['', Validators.required],
    startDate:[ new Date, Validators.required],
    endDate:[new Date, Validators.required],
    phoneNumber:['', Validators.required],
    region:['', Validators.required]
  })
  constructor(private fb: FormBuilder, private campaignService: CampaignService, private router: Router){}

  onSubmit():void{
    console.log(this.createForm.value)

    this.campaignService.createCampaign(this.createForm.value).subscribe({
      next:()=>{
        console.log("Created campaign");
        this.router.navigate(['/campaigns']);
      },
      error:(error)=> console.log('Error on create campaign', error)
    });
  }
}
