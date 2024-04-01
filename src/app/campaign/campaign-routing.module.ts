import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateCampaignComponent } from "./create-campaign/create-campaign.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CampaignDetailsComponent } from "./campaign-details/campaign-details.component";
import { CampaignEditComponent } from "./campaign-edit/campaign-edit.component";
import { isAuthGuard } from "../user/guards/is-auth.guard";
import { campaignExistsGuard } from "./guards/campaign-exists.guard";

const campaignRoutes: Routes = [
    {path:'campaigns', children:[
        {path:'', component: DashboardComponent},
        {path:'create', component: CreateCampaignComponent},
        {path:':id', canActivate:[campaignExistsGuard], children:[
            {path:'', component: CampaignDetailsComponent},
            {path:'edit',canActivate:[isAuthGuard] ,component: CampaignEditComponent}
        ]}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(campaignRoutes)],
    exports: [RouterModule]
})
export class CampaignRoutingModule{

}