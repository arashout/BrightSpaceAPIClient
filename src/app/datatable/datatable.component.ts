import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { ResultSet } from '../shared/result-set'

class Person {
  id: number;
  firstName: string;
  lastName: string;
  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

let dummyResultSet: ResultSet = {
  "Items": [
    {
      "id": 860,
      "firstName": "Superman",
      "lastName": "Yoda"
    },
    {
      "id": 870,
      "firstName": "Foo",
      "lastName": "Whateveryournameis"
    },
    {
      "id": 590,
      "firstName": "Toto",
      "lastName": "Titi"
    }
  ],

  "PagingInfo": { "HasMoreItems": false }
};

@Component({
  selector: 'app-datatable',
  templateUrl: 'datatable.component.html'
})
export class DatatableComponent implements OnInit {
  dtOptions: DataTables.Settings = {
    autoWidth: true
  };

  constructor() { }

  ngOnInit(): void {
    this.dtOptions.data = this.createDataSet(dummyResultSet);
    this.dtOptions.columns = this.createColumns(dummyResultSet);
  }

  createDataSet(rs: ResultSet) : Array<Array<any>> {
    let dataSet = [];
    let resultArray = rs.Items;
    resultArray.forEach((resultItem: Object) => {
      let arr = Object.keys(resultItem).map(function (val) { return resultItem[val] });
      dataSet.push(arr);
    });
    
    console.log(dataSet);
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