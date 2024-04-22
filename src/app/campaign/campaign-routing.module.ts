import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateCampaignComponent } from "./create-campaign/create-campaign.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CampaignDetailsComponent } from "./campaign-details/campaign-details.component";
import { CampaignEditComponent } from "./campaign-edit/campaign-edit.component";
import { isAuthGuard } from "../user/guards/is-auth.guard";
import { campaignExistsGuard } from "./guards/campaign-exists.guard";
import { isCampaignOwnerGuard } from "./guards/is-campaign-owner.guard";
import { MasterGuard } from "../master.guard";

const campaignRoutes: Routes = [
    {path:'', component: DashboardComponent},
    {path:'create', canActivate:[isAuthGuard], component: CreateCampaignComponent},
    {path:':id', canActivate:[campaignExistsGuard], children:[
        {path:'', component: CampaignDetailsComponent},
        {path:'edit', canActivate:[MasterGuard], data: {guards: ["isAuthGuard", "isCampaignOwnerGuard"]}, component: CampaignEditComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(campaignRoutes)],
    exports: [RouterModule]
})
export class CampaignRoutingModule{

}