import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';
import { CustomdirectiveDirective } from './customdirective.directive'; 
import { CommonModule } from '@angular/common';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';



@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    CustomdirectiveDirective,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
