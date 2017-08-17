import { Component } from '@angular/core';

import { BrightspaceAPIService } from '../shared/brightspace-api.service';
import { ResultSet } from '../shared/result-set';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent{
  // Initialize input values that are two-way data bound
  basePathValue: string = '/d2l/api/lp/1.13/';
  apiCommandValue = 'users/'
  
  constructor(private brightspaceService: BrightspaceAPIService) {}

  onEnter(event: KeyboardEvent){
    this.brightspaceService.getAPIResults(this.basePathValue, this.apiCommandValue);
  }
}
