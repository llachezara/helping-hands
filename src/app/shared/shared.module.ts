import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { ShortenStringPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    NavButtonComponent,
    ShortenStringPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    NavButtonComponent,
    ShortenStringPipe
  ]
})
export class SharedModule { }
