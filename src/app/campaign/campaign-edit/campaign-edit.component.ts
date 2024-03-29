import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CampaignDoc } from 'src/app/types/Campaign';
import { CampaignService } from '../campaign.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit{
  campaignId: string | null | undefined;

  regions = ['Vidin', 'Sliven', 'Blagoevgrad'];
  editForm = this.fb.group({
    title: ['', Validators.required],
    imageUrl: ['', Validators.required],
    description: ['', Validators.required],
    startDate: [new Date, Validators.required],
    endDate: [new Date, Validators.required],
    phoneNumber: ['', Validators.required],
    region: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id');

    this.campaignService.getCampaignById(this.campaignId).subscribe({
      next:(doc)=>{

        const startDate = doc.startDate.toDate();
        const endDate = doc.endDate.toDate();
        
        this.editForm.setValue({
          title: doc.title,
          imageUrl: doc.imageUrl,
          description: doc.description,
          startDate: startDate,
          endDate: endDate,
          phoneNumber: doc.phoneNumber,
          region: doc.region,
        })
        
      },
      error:(error)=>console.log(error)
    });
  }

  onSubmit() {
    console.log(this.editForm.value);
  }
}
