import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { SessionService } from './session.service';

import { SessionResponse } from './session';
import { ResultSet } from './result-set'

@Injectable()
export class BrightspaceAPIService {
    retrievedAPIResults = new EventEmitter<ResultSet>();

    constructor(private http: Http, private sessionService: SessionService) { }
    getAPIResultsObservable() {
        // Guard against making a request with expired token
        if (!this.sessionService.isSessionExpired()) {
            return this.http.get(document.URL + "api");
        }
        else {
            console.log("You need to refresh your token!");
            this.refreshSession();
        }
    }
    getAPIResults() {
        this.getAPIResultsObservable().subscribe(
            (response) => {
                let rs: ResultSet = response.json();
                this.retrievedAPIResults.emit(rs);
            },
            (error) => console.log(error)
        );
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