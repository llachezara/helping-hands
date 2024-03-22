import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateCampaignComponent } from "./create-campaign/create-campaign.component";

const campaignRoutes: Routes = [
    {path:'campaigns', children:[
        {path:'create', component: CreateCampaignComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(campaignRoutes)],
    exports: []
})
export class CampaignRoutingModule{

}