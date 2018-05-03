import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { SubTipo } from '../interfaces/sub-tipo';
import { SubsubTipo } from '../interfaces/subsub-tipo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SubsubtipoActividadService {

  private headers = new Headers({'Content-Type':'application/json'});
  private subTipo: SubTipo[] = [];
  private subSubTipo: SubsubTipo[] = [];
  
  constructor(private http: Http) { }

  getSubSubTiposActividad(){
    this.http.get("https://devmx.com.mx/fmbapp/public/api/subsubtipo_actividad", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: any) => {
            for(let i = 0; i < data.length; i++){
              let st = {id: data[i].id, crmit_codigounico: data[i].crmit_codigounico, crmit_subname: data[i].crmit_subname};
              this.subTipo.push(st);
              
              let sst = {id: data[i].id, crmit_subtipoactividadid: data[i].crmit_subtipoactividadid, crmit_subsubname: data[i].crmit_subsubname};
              this.subSubTipo.push(sst);              
            }
          }
        )
  }

  getAllSubTipo() : SubTipo[] {
    return this.subTipo;
  }

  getAllSubSubTipo() : SubsubTipo[] {
    return this.subSubTipo;
  }

  getSubSubTiposBySubTipo(subTipoId: string) : SubsubTipo[] {
    let subsub_tipos: SubsubTipo[] = [];

    for(let i = 0; i < this.subSubTipo.length; i++){
      if(subTipoId == this.subSubTipo[i].crmit_subtipoactividadid){
        subsub_tipos.push(this.subSubTipo[i])
      }
    }
    return subsub_tipos;
  }

}