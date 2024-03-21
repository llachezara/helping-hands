import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CampaignComponent } from "./campaign/campaign.component";

const campaignRoutes: Routes = [
    {path:'campaigns', children:[
        {path:'create', component: CampaignComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(campaignRoutes)],
    exports: []
})
export class CampaignRoutingModule{

}