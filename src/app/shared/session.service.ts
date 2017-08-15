import { EventEmitter, Injectable} from '@angular/core';


import { Session, SessionResponse } from './session'

@Injectable()
export class SessionService{
    session: Session;
    sessionUpdated=  new EventEmitter<boolean>();

    constructor() {
        this.session = new Session();
    }
    isSessionExpired() {
        return this.session.isExpired;
    }
    getSessionExpiration(): Date{
        return this.session.expiration;
    }

    setSessionFromSessionResponse(sessionResponse: SessionResponse) {
        this.session.expiration = new Date(sessionResponse.expiration);
        let currentTime = new Date();

        // Update whether the session should be expired or not
        let timeDifference = this.session.expiration.valueOf() - currentTime.valueOf();

        this.session.isExpired = timeDifference < 0;
        if (!this.session.isExpired) {
            // Emit Event so StatusBar can update
            this.sessionUpdated.emit();

            // Update the value of isExpired once the timer ends!
            setTimeout(() => {
                this.session.isExpired = true;
            }, timeDifference);
        }

    }
}