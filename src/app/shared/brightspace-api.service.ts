import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { SessionResponse } from './session';

import { SessionService } from './session.service';

@Injectable()
export class BrightspaceAPIService {
    constructor(private http: Http, private sessionService: SessionService) { }
    // Note: These return observables
    getAPIResults() {
        // Guard against making a request with expired token
        if (!this.sessionService.isSessionExpired()) {
            return this.http.get(document.URL + "api");
        }
        else {
            console.log("You need to refresh your token!");
            this.refreshSession();
        }
    }
    refreshSession() {
        this.getRefreshedSessionObservable().subscribe(
            (response) => {
                let sessionResponse: SessionResponse = response.json();
                this.sessionService.setSessionFromSessionResponse(sessionResponse);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    getRefreshedSessionObservable() { return this.http.get(document.URL + "refresh"); }
}