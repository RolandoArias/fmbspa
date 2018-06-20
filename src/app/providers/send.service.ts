import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SendService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private headers2 = new Headers({ 'Content-Type':'text/plain' });


  constructor(private http: Http) { }

    sendDataToApi(data) {
                             //https://endpoint.scribesoft.com/v1/orgs/27038/requests/6189?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f
      //return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/6334?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});
      //return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/6427?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});
      return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/6523?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});
    }
    
    sendData(data) {
      //console.log(data);
      return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/6523?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});
    }
  
    sendData2(data) {
      //console.log(data);
      return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/5876?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});
    }

    sendData3(data) {
      return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/6523?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});

      //return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/6334?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});
    }
}
