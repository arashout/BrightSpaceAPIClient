import { Component, OnChanges } from '@angular/core';

import { Timer } from '../shared/timer';

import { SessionService } from '../shared/session.service'

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent {
  isValidAccessToken: boolean;
  countdown: string = "0";

  constructor(private sessionService: SessionService) {
    this.sessionService.sessionUpdated.subscribe(
      (sessionChanged: boolean) => {
        this.isValidAccessToken = !this.sessionService.isSessionExpired();
        let timer = new Timer((difference: number) => {
          let msToMin = 1 / (1000 * 60);
          this.countdown = (difference * msToMin).toFixed(0);
        }, this.sessionService.getSessionExpiration());
      }
    )

  }
}
