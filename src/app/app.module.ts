import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommandBarComponent } from './command-bar/command-bar.component';
import { ResultItemComponent } from './result-item/result-item.component';
import { ResultsContainerComponent } from './results-container/results-container.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandBarComponent,
    ResultItemComponent,
    ResultsContainerComponent,
    StatusBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
