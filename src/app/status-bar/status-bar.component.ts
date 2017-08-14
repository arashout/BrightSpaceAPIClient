import { Component, OnChanges } from '@angular/core';

import { SessionService } from '../shared/session.service'

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent{
  isValidAccessToken: boolean;
  constructor(private sessionService: SessionService) { 
    this.isValidAccessToken = this.sessionService.isSessionExpired();
  }
}
