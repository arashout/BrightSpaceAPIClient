import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent{
  value = '';
  id = "command-bar";
  
  onEnter(event: KeyboardEvent){
    this.value = (<HTMLInputElement>event.target).value;
  }
}
