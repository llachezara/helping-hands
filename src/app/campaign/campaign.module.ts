import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CampaignRoutingModule } from "./campaign-routing.module";
import { CampaignComponent } from './campaign/campaign.component';

import {  MatCardModule } from "@angular/material/card";
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TextFieldModule } from "@angular/cdk/text-field";

@NgModule({
    declarations: [
    CampaignComponent
  ],
    imports:[
        CommonModule,
        CampaignRoutingModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatFormFieldModule,
        TextFieldModule
    ],
    providers:[]
})
export class CampaignModule{

}