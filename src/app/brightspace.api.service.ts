import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BrightspaceAPIService{
    constructor(private http: Http){}
    getData(){
        // Return observable
        console.log(document.URL + "api")
        return this.http.get(document.URL + "api");
    }
}