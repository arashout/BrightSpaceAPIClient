import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { SessionService } from '../shared/session.service'
import { BrightspaceAPIService } from '../shared/brightspace-api.service'

import { ResultSet } from '../shared/result-set'

@Component({
  selector: 'app-datatable',
  templateUrl: 'datatable.component.html'
})
export class DatatableComponent implements OnInit {
  dtOptions: DataTables.Settings = {
    pageLength: 100,
    autoWidth: true
  };
  // Need this to defer rendering of table before data is present
  dtTrigger: Subject<boolean> = new Subject();

  constructor(private sessionService: SessionService, private brightspaceAPIService: BrightspaceAPIService) { }
  ngOnInit() {
    this.brightspaceAPIService.retrievedAPIResults.subscribe(
      (rs: ResultSet) => {
        this.populateTable(rs);

        // Don't render table until data present
        this.dtTrigger.next();
      }
    )
  }
  populateTable(rs: ResultSet): void {
    if (rs.Items.length != 0) {
      this.dtOptions.columns = this.createColumns(rs);
      this.dtOptions.data = this.createDataSet(rs);
    }
  }

  createDataSet(rs: ResultSet): Array<Array<any>> {
    // Converts a result set to a DataSet which is the format that Angular-DataTable likes
    let dataSet = [];
    let resultArray = rs.Items;
    resultArray.forEach((resultItem: Object) => {
      let arr = Object.keys(resultItem).map(function (val) {
        if (typeof resultItem[val] === 'object') {
          return JSON.stringify((resultItem[val]));
        }
        else {
          return resultItem[val];
        }
      });
      dataSet.push(arr);
    });

    return dataSet;
  }

  createColumns(rs: ResultSet): DataTables.ColumnSettings[] {
    if (rs.Items.length != 0) {
      let columnSettings = [];
      // Get the column names from first item in result set
      Object.keys(rs.Items[0]).forEach(key => {
        let o = {};
        o["title"] = key;
        columnSettings.push(o);
      });
      return columnSettings;
    }
  }
}