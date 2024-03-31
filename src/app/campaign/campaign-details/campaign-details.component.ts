import { Component, OnInit, TemplateRef } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { CampaignDoc } from 'src/app/types/Campaign';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit{
  dialogRef: MatDialogRef<any, any> | undefined
  
  campaign$: Observable<CampaignDoc> | undefined = undefined;
  campaignId: string | null | undefined;

  isUserSignUpResultReady = false;
  isUserSignedUp: boolean | undefined;
 

  constructor(private route: ActivatedRoute, private campaignService: CampaignService, private dialog: MatDialog, private router: Router){}

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id');

    this.campaign$ = this.campaignService.getCampaignById(this.campaignId);
    const isUserSignedSubscription = this.campaignService.isCampaignSignedByUser(this.campaignId!).subscribe({
        next:(boolean)=>{
          this.isUserSignUpResultReady = true;
          this.isUserSignedUp = boolean;
        },
        error:(error)=>console.log(error)
    })

  }

  get currentUser(){
    return this.campaignService.currentUser();
  }

  signUp(){
    const signUpSubscription = this.campaignService.signUpUserForCampaign(this.campaignId!).subscribe({
      next:()=>{
        console.log('SigneUpUser');
        this.dialogRef?.close();
        this.isUserSignedUp = true;
      },
      error:(error)=>console.log(error)
    })
  }

  openDialog(dialog: TemplateRef<MatDialog>, panelClass: string): void {
    this.dialogRef = this.dialog.open(dialog,{
      panelClass: panelClass
    });
  }

  delete(){
    const deleteSubscription = this.campaignService.deleteCampaign(this.campaignId!).subscribe({
      next:()=>{
        
      console.log('Deleted campaign document');
        this.dialogRef?.close();
        this.router.navigate(['/campaigns']);
      },
      error:(error)=> console.log('Error from delete campaign')
    });

    console.log('User clicked Delete');
  }
}