import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NavigationComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SharedModule
  ],
  exports:[
    NavigationComponent,
    MainComponent,
    FooterComponent
  ]
})
export class CoreModule { }
