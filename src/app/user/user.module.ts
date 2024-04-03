import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { AuthService } from './auth.service';
import { MatchPasswordsDirective } from './directives/match-password.directive';

import { isGuestGuard } from './guards/is-guest.guard';
import { isAuthGuard } from './guards/is-auth.guard';
import { IsEmailDirective } from './directives/is-email.directive';
import { IsPasswordDirective } from './directives/is-password.directive';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MatchPasswordsDirective,
    UserProfileComponent,
    IsEmailDirective,
    IsPasswordDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule
  ],
  providers:[ isGuestGuard]
})
export class UserModule { }
