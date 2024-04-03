import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'/home'},
  { path: 'home', component: HomeComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'user', loadChildren: ()=> import('./user/user.module').then(m=> m.UserModule)},
  { path: 'campaigns', loadChildren: ()=> import('./campaign/campaign.module').then(m=> m.CampaignModule)},
  { path: '**', redirectTo:'/404'},
  { path: '404', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
