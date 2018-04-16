import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { Palabra } from '../interfaces/palabra';
 

@Injectable()
export class LandingService {

  	configUrl = "/assets/palabras_basura.json";

  	constructor(private http: HttpClient) { }

    getPalabrasMalas() {
		if (localStorage.getBasuraObs === undefined) {
			console.log('creando localstorage');
			return this.http.get(this.configUrl)
				.subscribe(data => {
					localStorage.getBasuraObs = JSON.stringify(data);
				});
		} else {
			return console.log('undefined');
		}
    }

}