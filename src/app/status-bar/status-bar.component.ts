import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent {
  haveAccessToken = false;
  accessTokenExpiryTime = 10;

  constructor() {
    setTimeout(() => {
      this.haveAccessToken = true;
    }, 5000);
  }

  getColor(){
    return (this.haveAccessToken) ? {"backgroundColor":"green"} : {"backgroundColor":"red"}
  }
}
