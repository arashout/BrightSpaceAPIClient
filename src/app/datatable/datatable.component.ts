import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';

import { SessionService } from '../shared/session.service'
import { BrightspaceAPIService } from '../shared/brightspace-api.service'

import { ResultSet } from '../shared/result-set'

@Component({
  selector: 'app-datatable',
  templateUrl: 'datatable.component.html'
})
export class DatatableComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {
    pageLength: 100,
    autoWidth: true
  };
  // Need this to defer rendering of table before data is present
  dtTrigger: Subject<boolean> = new Subject();

  constructor(private sessionService: SessionService, private brightspaceAPIService: BrightspaceAPIService) { }
  ngOnInit() {
    this.brightspaceAPIService.retrievedAPIResults.subscribe(
      (results: Object) => {
        if (this.dtElement.dtInstance === undefined) {
          // Populate table
          this.populateTable(results);
          // Don't render table until data present
          this.dtTrigger.next();
        }
        else {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance = dtInstance.destroy(true);
            this.dtTrigger.next();
          });
        }

      }
    );

  }

  populateTable(o: Object): void {
    if (o['Items'] !== undefined) {
      let rs = <ResultSet>o;
      if (rs.Items.length !== 0) {
        this.dtOptions.columns = this.createColumns(rs);
        this.dtOptions.data = this.createDataSet(rs);
      }
    }
    // For the case of having only one result, object DOES NOT have .Items property
    else {
      let result = o;
      this.dtOptions.columns = this.convertResultToColumns(result);
      this.dtOptions.data = [this.convertResultToArray(result)]; // DataSet: Array<Array<any>>
    }
  }

  createDataSet(rs: ResultSet): Array<Array<any>> {
    // Converts a result set to a DataSet which is the format that Angular-DataTable likes
    let dataSet = [];
    let resultArray = rs.Items;
    resultArray.forEach((resultItem: Object) => {
      let arr = this.convertResultToArray(resultItem);
      dataSet.push(arr);
    });

    return dataSet;
  }

  createColumns(rs: ResultSet): DataTables.ColumnSettings[] {
    return this.convertResultToColumns(rs.Items[0]);
  }

  convertResultToColumns(resultItem: Object): DataTables.ColumnSettings[] {
    let columnSettings = [];
    Object.keys(resultItem).forEach(key => {
      let o = {};
      o["title"] = key;
      columnSettings.push(o);
    });
    return columnSettings;
  }

  convertResultToArray(resultItem: Object): Array<any> {
    return Object.keys(resultItem).map(function (val) {
      if (typeof resultItem[val] === 'object') {
        return JSON.stringify((resultItem[val]));
      }
      else {
        return resultItem[val];
      }
    });
  }
}