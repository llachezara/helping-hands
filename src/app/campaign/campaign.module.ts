import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CampaignRoutingModule } from "./campaign-routing.module";
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from "@angular/forms";

import {  MatCardModule } from "@angular/material/card";
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TextFieldModule } from "@angular/cdk/text-field";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';

import { CampaignService } from "./campaign.service";
import { CampaignItemComponent } from './campaign-item/campaign-item.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { campaignExistsGuard } from "./guards/campaign-exists.guard";


@NgModule({
    declarations: [
    CreateCampaignComponent,
    DashboardComponent,
    CampaignItemComponent,
    CampaignDetailsComponent,
    CampaignEditComponent
  ],
    imports:[
        CommonModule,
        CampaignRoutingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatFormFieldModule,
        TextFieldModule,
        MatPaginatorModule,
        MatGridListModule,
        MatDialogModule
    ],
    providers:[CampaignService, campaignExistsGuard]
})
export class CampaignModule{

}