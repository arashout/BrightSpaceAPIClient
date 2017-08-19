import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SessionService } from './session.service';
import { MessageService, Message, MessageEnum } from './message.service';

import { ResultSet } from './result-set';
import { SessionResponse } from './session';

@Injectable()
export class BrightspaceAPIService {
    retrievedAPIResults = new EventEmitter<Object>();

    constructor(
        private http: Http,
        private sessionService: SessionService,
        private messageService: MessageService
    ) { }

    getAPIResultsPromise(basePath: string, apiCommand: string, queryParameters: Object) {
        // Guard against making a request with expired token
        if (!this.sessionService.isSessionExpired()) {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            return this.http.post(
                document.URL + "api",
                {
                    apiEndpoint: basePath + apiCommand,
                    queryParameters: queryParameters
                },
                { headers: headers }
            ).toPromise();
        }
        else {
            this.messageService.messageUpdated.emit(
                new Message(
                    "Token was expired!",
                    "Wait until your token is refreshed.\nThen try again.",
                    10,
                    "",
                    MessageEnum.IS_WARNING
                )
            );
            this.refreshSession();
        }
    }

    getAPIResults(basePath: string, apiCommand: string, queryParameters: Object) {
        this.getAPIResultsPromise(basePath, apiCommand, queryParameters).then(
            (response) => {
                const responseObject = response.json();
                let rs: ResultSet;
                // If there is only one result, it doesn't have properties of ResultSet...
                // So we add it for consistency
                if (responseObject['Items'] === undefined) {
                    rs = {
                        "Items": [responseObject],
                        "PagingInfo": { "HasMoreItems": false }
                    };
                }
                else {
                    rs = responseObject;
                }
                this.messageService.messageUpdated.emit(
                    new Message(
                        "Results Info:",
                        JSON.stringify(rs.PagingInfo),
                        100
                    )
                );
                this.retrievedAPIResults.emit(rs);
            }
        ).catch(
            (reason: Response) => {
                let message = new Message(
                    "Error: HTTP GET request failed due to:",
                    "",
                    100,
                    reason.toString(),
                    MessageEnum.IS_DANGER
                );
                switch (reason.status) {
                    case 400: {
                        message.body = "Invalid search parameters";
                        break;
                    }
                    case 403: {
                        message.body = "Lack of permissions";
                        break;
                    }
                    case 404: {
                        message.body = "Resource not found";
                        break;
                    }
                }
                this.messageService.messageUpdated.emit(message);
            }
            );
    }
    refreshSession() {
        this.getRefreshedSessionObservable().subscribe(
            (response) => {
                let sessionResponse: SessionResponse = response.json();
                this.messageService.messageUpdated.emit(
                    new Message(
                        "Session refreshed",
                        "Automatically refreshed your session",
                        10,
                        "",
                        MessageEnum.IS_SUCCESS
                    )
                );
                this.sessionService.setSessionFromSessionResponse(sessionResponse);
            },
            (error: Response) => {
                console.log(error);
                this.messageService.messageUpdated.emit(
                    new Message(
                        "Error: Trying to refresh session",
                        error["_body"], // Typescript is hiding this property from me...
                        100,
                        error.toString(),
                        MessageEnum.IS_DANGER
                    )
                );
            }
        );
    }
    getRefreshedSessionObservable() { return this.http.get(document.URL + "refresh"); }
}