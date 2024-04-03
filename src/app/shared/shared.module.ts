import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { ShortenStringPipe } from './shorten.pipe';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    NavButtonComponent,
    ShortenStringPipe,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    NavButtonComponent,
    ShortenStringPipe,
    LoaderComponent
  ]
})
export class SharedModule { }
