import { Component, OnInit } from '@angular/core';

import { BrightspaceAPIService } from '../brightspace.api.service'

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent{
  value = '';
  id = "command-bar";

  constructor(private brightspaceService: BrightspaceAPIService) { }

  getAPIData() {
    this.brightspaceService.getData()
      .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
      );
  }

  onEnter(event: KeyboardEvent){
    this.value = (<HTMLInputElement>event.target).value;
    this.getAPIData();
  }
}
