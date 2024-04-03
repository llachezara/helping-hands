import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { isGuestGuard } from './guards/is-guest.guard';
import { isAuthGuard } from './guards/is-auth.guard';

const routes: Routes = [
    {path:'login', canActivate:[isGuestGuard], component: LoginComponent},
    {path:'register', canActivate:[isGuestGuard], component: RegisterComponent},
    {path:'profile', canActivate:[isAuthGuard], component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }