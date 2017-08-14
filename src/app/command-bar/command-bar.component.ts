import { Component, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';

import { BrightspaceAPIService } from '../shared/brightspace-api.service';
import { ResultSet } from '../shared/result-set';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent{
  @Output() onRetrievedResultSet = new EventEmitter<Object>();

  private value: string = '';
  constructor(private brightspaceService: BrightspaceAPIService) {}

  getAPIResults() {
    this.brightspaceService.getAPIResults()
      .subscribe(
      (response) => {
        let resultSet: ResultSet = response.json();
        this.onRetrievedResultSet.emit(resultSet);
      },
      (error) => console.log(error)
      );
  }

  onEnter(event: KeyboardEvent){
    this.value = (<HTMLInputElement>event.target).value;
    this.getAPIResults();
  }
}
