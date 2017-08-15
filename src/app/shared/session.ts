export class Session {
    isExpired: boolean
    expiration: Date
    constructor(){
        this.isExpired = false;
        this.expiration = new Date();
    }
}

/**
 * Interface for recieving responses from backend
 */
export interface SessionResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expiration: string;
}