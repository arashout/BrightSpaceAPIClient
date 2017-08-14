import { Injectable } from '@angular/core';

import {Session} from './session'
@Injectable()
export class SessionService{
    session: Session;
    constructor(){
        this.session = new Session();
    }
    isSessionExpired(){
        return this.session.isExpired;
    }
    shouldSessionExpire(){
        return this.session.expiration.valueOf() > 0;
    }

}