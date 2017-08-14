import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BrightspaceAPIService{
    constructor(private http: Http){}
    // Note: These return observables
    getAPIResults(){return this.http.get(document.URL + "api");}
    getRefreshedSession(){return this.http.get(document.URL + "refresh");}
}