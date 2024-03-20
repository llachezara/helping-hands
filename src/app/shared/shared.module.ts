import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavButtonComponent } from './nav-button/nav-button.component';

@NgModule({
  declarations: [
    NavButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    NavButtonComponent
  ]
})
export class SharedModule { }
