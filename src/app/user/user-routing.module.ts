import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { isGuestGuard } from './guards/is-guest.guard';

const routes: Routes = [
  { path: 'user', 
    children: [
        {path:'login', canActivate:[isGuestGuard], component: LoginComponent},
        {path:'register', canActivate:[isGuestGuard], component: RegisterComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }