import { Component, OnInit } from '@angular/core';

import { ResultSet } from './shared/result-set';
import { SessionResponse } from './shared/session'

import { BrightspaceAPIService } from './shared/brightspace-api.service';
import { SessionService } from './shared/session.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private brightspaceService: BrightspaceAPIService, private sessionService: SessionService) { }

  ngOnInit() {
    this.brightspaceService.refreshSession();
  }
}
