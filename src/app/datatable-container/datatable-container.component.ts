import {
  Component,
  AfterContentInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';

import { SessionService } from '../shared/session.service';
import { BrightspaceAPIService } from '../shared/brightspace-api.service';

import { ResultSet } from '../shared/result-set';

import { DatatableComponent } from './datatable/datatable.component';

@Component({
  selector: 'app-datatable-container',
  templateUrl: './datatable-container.component.html',
  styleUrls: ['./datatable-container.component.css']
})
export class DatatableContainerComponent implements AfterContentInit {
  // Get a reference to local '#container' <- in HTML
  // Read it as a ViewContainerRef so that it has createComponentMethod
  @ViewChild('datatableContainer', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private sessionService: SessionService,
    private brightspaceAPIService: BrightspaceAPIService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngAfterContentInit() {
    const datatableFactory = this.resolver.resolveComponentFactory(DatatableComponent);
    this.brightspaceAPIService.retrievedAPIResults.subscribe(
      (rs: ResultSet) => {
        this.container.remove();
        
        let datatableRef = this.container.createComponent(datatableFactory);
        datatableRef.instance.populateTable(this.createColumns(rs), this.createDataSet(rs));
      });
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

  createColumns(rs: ResultSet): Array<string> {
    return Object.keys(rs.Items[0]);
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
