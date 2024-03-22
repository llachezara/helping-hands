import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateCampaignComponent } from "./create-campaign/create-campaign.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CampaignDetailsComponent } from "./campaign-details/campaign-details.component";

const campaignRoutes: Routes = [
    {path:'campaigns', children:[
        {path:'', component: DashboardComponent},
        {path:'create', component: CreateCampaignComponent},
        {path:':id', component: CampaignDetailsComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(campaignRoutes)],
    exports: [RouterModule]
})
export class CampaignRoutingModule{

}