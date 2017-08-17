import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SessionService } from './session.service';

import { ResultSet } from './result-set';
import { SessionResponse } from './session';

@Injectable()
export class BrightspaceAPIService {
    retrievedAPIResults = new EventEmitter<Object>();

    constructor(private http: Http, private sessionService: SessionService) { }

    getAPIResultsPromise(basePath: string, apiCommand: string) {
        // Guard against making a request with expired token
        if (!this.sessionService.isSessionExpired()) {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let params = new URLSearchParams();
            params.set("command", apiCommand);
            params.set("basePath", basePath);

            let options = new RequestOptions({ headers: headers, params: params });

            return this.http.get(document.URL + "api", { search: params }).toPromise();
        }
        else {
            console.log("You need to refresh your token!");
            this.refreshSession();
        }
    }

    getAPIResults(basePath: string, apiCommand: string) {
        this.getAPIResultsPromise(basePath, apiCommand).then(
            (response) => {
                const responseObject = response.json();
                let rs: ResultSet;
                // If there is only one result, it doesn't have properties of ResultSet...
                // So we add it for consistency
                if (responseObject['Items'] === undefined) {
                    rs = {
                        "Items":[responseObject],
                        "PagingInfo":{"HasMoreItems": false}
                    };
                }
                else {
                    rs = responseObject;
                }
                this.retrievedAPIResults.emit(rs);
            }
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