export class Session {
    isExpired: boolean
    expiration: Date
    constructor(){
        this.isExpired = false;
        this.expiration = new Date();
    }
}

export interface SessionResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expiration: string;
}