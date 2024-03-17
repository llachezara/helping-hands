import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { AuthService } from './auth.service';
import { MatchPasswordsDirective } from './directives/match-password.directive';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MatchPasswordsDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers:[AuthService]
})
export class UserModule { }
