import { BrowserModule } from '@angular/platform-browser';
import {HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommandBarComponent } from './command-bar/command-bar.component';
import { ResultItemComponent } from './results-container/result-item/result-item.component';
import { ResultsContainerComponent } from './results-container/results-container.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

import { BrightspaceAPIService } from './brightspace.api.service' 

@NgModule({
  declarations: [
    AppComponent,
    CommandBarComponent,
    ResultItemComponent,
    ResultsContainerComponent,
    StatusBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [BrightspaceAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
