import { Component } from '@angular/core';

import { BrightspaceAPIService } from '../shared/brightspace-api.service';
import { MessageService, Message, MessageEnum } from '../shared/message.service';
import { ResultSet } from '../shared/result-set';

import { isValidJSON } from '../shared/util';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent{
  // Initialize input values that are two-way data bound
  basePathValue: string = '/d2l/api/lp/1.13/';
  apiCommandValue = 'users/'
  queryParameterValue: string = "{}"
  
  constructor(private brightspaceService: BrightspaceAPIService, private messageService: MessageService) {}

  onEnter(event: KeyboardEvent){
    // Validate queryParameterValue to ensure it is valid JSON
    if(isValidJSON(this.queryParameterValue)){
      this.brightspaceService.getAPIResults(this.basePathValue, this.apiCommandValue, JSON.parse(this.queryParameterValue));
    }
    else{
      this.messageService.messageUpdated.emit(
        new Message(
          "Query parameters not valid JSON",
          "Double check that the query parameters textarea contains valid JSON",
          100,
          'Remember that all keys and values must be wrapped in double quotations e.g. {"Bookmark":"100"}',
          MessageEnum.IS_DANGER
        )
      );
    }
    
  }
}
