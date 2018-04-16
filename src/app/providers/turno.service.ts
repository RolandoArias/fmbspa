import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Turno } from '../interfaces/turno';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TurnoService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Turno[]>{
    return this.http.get("http://devmx.com.mx/fmbapp/public/api/turno", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}