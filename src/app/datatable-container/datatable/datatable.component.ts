import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';

import { ResultSet } from '../../shared/result-set';

@Component({
  selector: 'app-datatable',
  templateUrl: 'datatable.component.html'
})
export class DatatableComponent{
  private columnHeaders: Array<string>;
  private rows: Array<Array<any>>;
  private isRendered: boolean = false;

  // Need to find a workaround for this...
  private RENDER_DELAY = 500;

  populateTable(columns: Array<string>, dataset: Array<Array<any>>){
    this.columnHeaders = columns;
    this.rows = dataset;
    this.isRendered = true;
    setTimeout( ()=>{
      $("#datatable").DataTable();
    }, this.RENDER_DELAY );
    
  }
}