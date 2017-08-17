import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { CommandBarComponent } from './command-bar/command-bar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

import { BrightspaceAPIService } from './shared/brightspace-api.service'
import { SessionService } from './shared/session.service';
import { DatatableComponent } from './datatable-container/datatable/datatable.component';
import { DatatableContainerComponent } from './datatable-container/datatable-container.component'

@NgModule({
  declarations: [
    AppComponent,
    CommandBarComponent,
    StatusBarComponent,
    DatatableComponent,
    DatatableContainerComponent
  ],
  entryComponents: [
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DataTablesModule,
    FormsModule
  ],
  providers: [BrightspaceAPIService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
