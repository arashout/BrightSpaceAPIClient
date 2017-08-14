import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent {
  isValidAccessToken = false;

  constructor() {
    setTimeout(() => {
      this.isValidAccessToken = true;
    }, 5000);
  }
}
