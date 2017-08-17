import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommandBarComponent } from './command-bar/command-bar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

import { BrightspaceAPIService } from './shared/brightspace-api.service';
import { SessionService } from './shared/session.service';
import { MessageService } from './shared/message.service';

import { DatatableComponent } from './datatable-container/datatable/datatable.component';
import { DatatableContainerComponent } from './datatable-container/datatable-container.component';
import { MessageBarComponent } from './message-bar/message-bar.component'

@NgModule({
  declarations: [
    AppComponent,
    CommandBarComponent,
    StatusBarComponent,
    DatatableComponent,
    DatatableContainerComponent,
    MessageBarComponent
  ],
  entryComponents: [
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [BrightspaceAPIService, SessionService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
