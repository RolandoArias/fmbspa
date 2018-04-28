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

	configUrl = "https://app.devmx.com.mx/assets/palabras_basura.json";
	mesajesUrl = "https://app.devmx.com.mx/assets/mensajes_validaciones.json";

  	constructor(private http: HttpClient) { }
	
	getPalabrasMalas() {
		localStorage.removeItem('getBasuraObs');
		if (localStorage.getBasuraObss === undefined) {
			console.log('creando localstorage');
			return this.http.get(this.configUrl)
				.subscribe(data => {
					localStorage.getBasuraObss = JSON.stringify(data);
				});
		} else {
			return console.log('undefined');
		}
	}

	getMensajes() {
		if (localStorage.getMgss === undefined) {
			console.log('creando MEnsaje localstorage');
			return this.http.get(this.mesajesUrl)
				.subscribe(data => {
					localStorage.getMgss = JSON.stringify(data);
				});
		} else {
			return console.log('undefined Mensajes');
		}
	}


	getInit(){
		this.getMensajes();
		this.getPalabrasMalas();
	}

}