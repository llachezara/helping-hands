import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any> | undefined;
  dialogRef: MatDialogRef<any, any> | undefined
  
  campaign$: Observable<CampaignDoc> | undefined = undefined;
  campaignId: string | null | undefined
  constructor(private route: ActivatedRoute, private campaignService: CampaignService, private dialog: MatDialog, private router: Router){}

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id');

    this.campaign$ = this.campaignService.getCampaignById(this.campaignId);
  }

  signUp(){
    //TODO: Sign up user for campaign;
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(this.deleteDialog!,{
      panelClass: 'delete-dialog'
    });
  }

  delete(){
    
    this.campaignService.deleteCampaign(this.campaignId!).subscribe({
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