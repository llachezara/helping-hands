import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {
  regions = ["Blagoevgrad", "Vidin"]

  createForm = this.fb.group({
    title:['', Validators.required],
    imageUrl: ['', Validators.required],
    description:['', Validators.required],
    startDate:[null, Validators.required],
    endDate:[null, Validators.required],
    phoneNumber:['', Validators.required],
    region:[null, Validators.required]
  })
  constructor(private fb: FormBuilder, private campaignService: CampaignService, private authService: AuthService){}

  onSubmit():void{
    console.log(this.createForm.value)

    this.campaignService.createCampaign(this.createForm.value).subscribe((data)=>console.log("Created campaign", data));
  }
}
