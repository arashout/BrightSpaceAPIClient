import { Component } from '@angular/core';

import { BrightspaceAPIService } from '../shared/brightspace-api.service';
import { ResultSet } from '../shared/result-set';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent{

  private value: string = '';
  constructor(private brightspaceService: BrightspaceAPIService) {}

  onEnter(event: KeyboardEvent){
    this.value = (<HTMLInputElement>event.target).value;
    this.brightspaceService.getAPIResults();
  }
}
