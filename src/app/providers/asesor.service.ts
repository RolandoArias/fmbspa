import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Asesor } from '../interfaces/asesor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AsesorService {

  constructor(private http: Http) { }

  getAll() : Observable<Asesor[]>{
    return this.http.get("http://devmx.com.mx/fmbapp/public/api/asesor")
               .map(
                 (res: Response) => res.json()
               )
  }
}
