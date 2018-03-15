import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Carrera } from '../interfaces/carrera';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CarreraService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Carrera[]>{
    return this.http.get("http://devmx.com.mx/fmbapp/public/api/carrera", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}