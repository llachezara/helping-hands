import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CampaignRoutingModule } from "./campaign-routing.module";
import { CampaignComponent } from './campaign/campaign.component';
import { ReactiveFormsModule } from "@angular/forms";

import {  MatCardModule } from "@angular/material/card";
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TextFieldModule } from "@angular/cdk/text-field";
import { CampaignService } from "./campaign.service";

@NgModule({
    declarations: [
    CampaignComponent
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
        TextFieldModule
    ],
    providers:[CampaignService]
})
export class CampaignModule{

}