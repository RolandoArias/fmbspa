import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {GeneralService} from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';

import { LandingValidation } from '../validations/landing.validations';

import { Csq } from '../interfaces/csq';
import { Hora } from '../interfaces/hora';
import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Genero } from '../interfaces/genero';
import { Asesor } from '../interfaces/asesor';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';

import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service'; 
import { SendService } from '../providers/send.service';
import { HoraService } from '../providers/hora.service';
import { NivelService } from '../providers/nivel.service';
import { CanalService } from '../providers/canal.service';
import { CicloService } from '../providers/ciclo.service';
import { CampusService } from '../providers/campus.service';
import { AsesorService } from '../providers/asesor.service';
import { GeneroService } from '../providers/genero.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service'; 
import { ParentescoService } from '../providers/parentesco.service';
import { CampusCitaService } from '../providers/campus-cita.service';
import { TipificacionService } from '../providers/tipificacion.service';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.scss']
})

export class NewRegisterComponent implements OnInit {
     
    form: FormGroup;

    //maxDate = new Date(2018, this.month.getMonth(),12);
    maxDate = LandingValidation.fechaLimite();
    startDate = LandingValidation.fechaInicio();    
    
    Usuario: FormControl;
    Canal: FormControl;
    CSQ: FormControl;
    TelefonoCorreo: FormControl;
    Interesa: FormControl;
   

    Nombre: FormControl;
    ApellidoPaterno: FormControl;
    ApellidoMaterno: FormControl;
    CorreoElectronico: FormControl;
    NumeroCelular: FormControl;
    Telefono: FormControl;
    Genero: FormControl;
    FechaNacimiento: FormControl;
    Edad: FormControl;


    NombreTutor: FormControl;
    ApellidoPaternoTutor: FormControl;
    ApellidoMaternoTutor: FormControl;
    CorreoElectronicoTutor: FormControl;
    NumeroCelularR: FormControl;
    TelefonoTutor: FormControl;
    ParentescoTutor: FormControl;


    Campus:FormControl;
    AreaInteres:FormControl;
    Nivel:FormControl;
    Modalidad:FormControl;
    Carrera:FormControl;
    Ciclo:FormControl;
    Tipificacion:FormControl;
    Notas:FormControl;


    CampusCitas :FormControl;
    FechaCita :FormControl;
    HoraCita :FormControl;
    Programacion :FormControl;
    Transferencia :FormControl;
    Asesor :FormControl;

    csqs: Csq[] = [];
    horas: Hora[] = [];
    ciclos: Ciclo[] = [];
    niveles: Nivel[] = [];
    canales: Canal[] = [];
    campus: Campus[] = [];
    generos: Genero[] = [];
    asesores: Asesor[] = [];
    carreras: Carrera[] = [];
    intereses: Interes[] = [];
    modalidades: Modalidad[] = [];
    campus_citas: CampusCita[] = [];
    parentescos: Parentesco[] = [];
    tipificaciones: Tipificacion[] = [];

    constructor(private gralService: GeneralService, 
                public dialog: MatDialog, 
                private renderer: Renderer2,
                private csqServ: CsqService,
                private horaServ: HoraService,
                private sendServ: SendService,
                private nivelServ: NivelService,
                private cicloServ: CicloService,
                private canalServ: CanalService,
                private campusServ: CampusService,
                private asesorServ: AsesorService,
                private generoServ: GeneroService,
                private carreraServ: CarreraService,
                private interesServ: InteresService,
                private modalidadServ: ModalidadService,
                private parentescoServ: ParentescoService,
                private campusCitaServ: CampusCitaService,
                private tipicicacionServ: TipificacionService) {}


    ngOnInit() {
        // Se obtiene todos los canales
        this.canalServ.getAll()
        .subscribe(
            (data: Canal[]) => this.canales = data
        )
        // Se obtienen todos los csqs
        this.csqServ.getAll()
            .subscribe(
                (data: Csq[]) => this.csqs = data
            )
        // Se obtienen todos los intereses
        this.interesServ.getAll()
            .subscribe(
                (data: Interes[]) => this.intereses = data
            )
        // Se obtienen todos los generos
        this.generoServ.getAll()
            .subscribe(
                (data: Genero[]) => this.generos = data
            )
        // Se obtienen todos los parentescos
        this.parentescoServ.getAll()
            .subscribe(
                (data: Parentesco[]) => this.parentescos = data
            )
        // Se obtienen todos los campus
        this.campusServ.getAll()
            .subscribe(
                (data: Campus[]) => this.campus = data
            )
        // Se obtienen todos los niveles
        this.nivelServ.getAll()
            .subscribe(
                (data: Nivel[]) => this.niveles = data
            )
        // Se obtienen todas las modalidades
        this.modalidadServ.getAll()
            .subscribe(
                (data: Modalidad[]) => this.modalidades = data
            )
        // Se obtienen todas las carreras
        this.carreraServ.getAll()
            .subscribe(
                (data: Carrera[]) => this.carreras = data
            )
        // Se obtienen los ciclos
        this.cicloServ.getAll()
            .subscribe(
                (data: Ciclo[]) => this.ciclos = data
            )
            // Se obtienen todos los intereses
        this.interesServ.getAll()
            .subscribe(
                (data: Interes[]) => this.intereses = data
            )
        // Se obtienen todas las tipificaciones
        this.tipicicacionServ.getAll()
            .subscribe(
                (data: Tipificacion[]) => this.tipificaciones = data
            )
        // Se obtienen todos los campus-cita
        this.campusCitaServ.getAll()
            .subscribe(
                (data: CampusCita[]) => this.campus_citas = data
            )
        // Se obtienen todas las hora para asignar una cita
        this.horaServ.getAll()
            .subscribe(
                (data: Hora[]) => this.horas = data
            )
        // Se obtienen todos lo asesores
        this.asesorServ.getAll()
            .subscribe(
                (data: Asesor[]) => this.asesores = data   
            )

        this.formInit();
    }

    formInit(){
        this.form = new FormGroup({
            Usuario: new FormControl({value: '', disabled: true}, Validators.required),
            Canal: new FormControl('', Validators.required),
            CSQ: new FormControl('', Validators.required),
            TelefonoCorreo: new FormControl('', Validators.required),
            Interesa:new FormControl(''),

            Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
            ApellidoMaterno: new FormControl('',[LandingValidation.palabraMalaValidator()]),
            CorreoElectronico: new FormControl('', [Validators.required,LandingValidation.emailMaloValidator()]),
            NumeroCelular: new FormControl('', [Validators.minLength(10)]),
            Telefono: new FormControl('',[Validators.required,Validators.minLength(10)]),
            Genero: new FormControl(''),
            FechaNacimiento: new FormControl(''),
            Edad: new FormControl('', [Validators.minLength(2)]),

            NombreTutor: new FormControl(''),
            ApellidoPaternoTutor: new FormControl(''),            
            ApellidoMaternoTutor: new FormControl(''),
            CorreoElectronicoTutor: new FormControl(''),
            NumeroCelularR: new FormControl(''),
            TelefonoTutor: new FormControl(''),
            ParentescoTutor: new FormControl(''),
            
            Campus: new FormControl(''),
            AreaInteres: new FormControl(''),
            Nivel: new FormControl(''),
            Modalidad: new FormControl(''),
            Carrera: new FormControl(''),
            Ciclo: new FormControl(''),
            Tipificacion: new FormControl(''),
            Notas:new FormControl(''),

            CampusCitas: new FormControl({value: '', disabled: true}, Validators.required),
            FechaCita: new FormControl({value: '', disabled: true}, Validators.required),                        
            HoraCita: new FormControl({value: '', disabled: true}, Validators.required),
            Programacion: new FormControl({value: '', disabled: true}, Validators.required),
            Transferencia: new FormControl({value: '', disabled: true}, Validators.required),
            Asesor: new FormControl({value: '', disabled: true}, Validators.required)

        });
    }

    onSubmit(){
     this.sendServ.sendDataToApi(this.form.value)
         .subscribe(
              (res: any) => {
                  if(res.status == 200){
                     this.showDialog("Los datos se han guardado correctamente.");
                     this.resetForm();
                  }else{
                     this.showDialog("Error al realizar el registro.");
                     this.resetForm();
                  }
              }
            )
    }

    resetForm(){
        this.showDialog("Los datos se han guardado correctamente.");
        this.form.reset();
    }
        
    onKeyFechaNacimiento(){
        let edad = this.form.controls.Edad.value;
        let year = new Date().getFullYear();
        let fechaNac = year-edad;
        let fecha = '1/1/'+fechaNac;        
        this.form.controls.FechaNacimiento.setValue(fecha);        
    }
    
    onKeydownEmail(event: KeyboardEvent) {
        let name = this.form.controls.NombreTutor.value;  
        if(name==''){
            this.form.controls.NombreTutor.clearValidators();
            this.form.controls.ApellidoPaternoTutor.clearValidators();
            this.form.controls.ApellidoMaternoTutor.clearValidators();
            this.form.controls.CorreoElectronicoTutor.clearValidators();
            this.form.controls.NumeroCelularR.clearValidators();
            this.form.controls.TelefonoTutor.clearValidators();
            this.form.controls.ParentescoTutor.clearValidators();
        }else{
              
             this.form.controls.NombreTutor.setValidators([Validators.required,LandingValidation.palabraMalaValidator()]);
             this.form.controls.ApellidoPaternoTutor.setValidators([Validators.required,LandingValidation.palabraMalaValidator()]);
             this.form.controls.ApellidoMaternoTutor.setValidators([Validators.required,LandingValidation.palabraMalaValidator()]);
             this.form.controls.CorreoElectronicoTutor.setValidators([Validators.required,LandingValidation.emailMaloValidator()]);
             this.form.controls.NumeroCelularR.setValidators([Validators.required,Validators.minLength(10)]);
             this.form.controls.TelefonoTutor.setValidators([Validators.required,Validators.minLength(10)]);
             this.form.controls.ParentescoTutor.setValidators([Validators.required]); 
        }
             this.form.controls.NombreTutor.updateValueAndValidity();
             this.form.controls.ApellidoPaternoTutor.updateValueAndValidity();
             this.form.controls.ApellidoMaternoTutor.updateValueAndValidity();
             this.form.controls.CorreoElectronicoTutor.updateValueAndValidity();
             this.form.controls.NumeroCelularR.updateValueAndValidity();
             this.form.controls.TelefonoTutor.updateValueAndValidity();
             this.form.controls.ParentescoTutor.updateValueAndValidity();
    }

    _keyOnly3letter(event:any, name:any){
       LandingValidation.letterName(event,name);
    }

    _keyPress(event: any) {         
       LandingValidation.onlyNumber(event);        
    }

    _keyPressTxt(event: any) {        
        LandingValidation.onlyLetter(event);
    }
 
    onChange(){
        if(this.form.controls.Nombre.value !=''  && this.form.controls.ApellidoPaterno.value !='' && this.form.controls.ApellidoMaterno.value !='' && this.form.controls.CorreoElectronico.value !='' && this.form.controls.NumeroCelular.value !='' && this.form.controls.Telefono.value !=''){
            this.form.controls.CampusCitas.reset({value: '', disabled: false});
            this.form.controls.FechaCita.reset({value: '', disabled: false});
            this.form.controls.HoraCita.reset({value: '', disabled: false});
            this.form.controls.Programacion.reset({value: '', disabled: false});
            this.form.controls.Transferencia.reset({value: '', disabled: false});
            this.form.controls.Asesor.reset({value: '', disabled: false}); 
        }else{
           this.form.controls.CampusCitas.reset({value: '', disabled: true});
            this.form.controls.FechaCita.reset({value: '', disabled: true});
            this.form.controls.HoraCita.reset({value: '', disabled: true});
            this.form.controls.Programacion.reset({value: '', disabled: true});
            this.form.controls.Transferencia.reset({value: '', disabled: true});
            this.form.controls.Asesor.reset({value: '', disabled: true}); 
        }
    }

    onChangeInteres(value){
        if(value==''){        
            this.form.controls.Campus.clearValidators();
            this.form.controls.AreaInteres.clearValidators();
            this.form.controls.Nivel.clearValidators();
            this.form.controls.Modalidad.clearValidators();
            this.form.controls.Carrera.clearValidators();
            this.form.controls.Ciclo.clearValidators();
        
        }else{

             this.form.controls.Campus.setValidators([Validators.required]);
             this.form.controls.AreaInteres.setValidators([Validators.required]);
             this.form.controls.Nivel.setValidators([Validators.required]);
             this.form.controls.Modalidad.setValidators([Validators.required]);
             this.form.controls.Carrera.setValidators([Validators.required]);
             this.form.controls.Ciclo.setValidators([Validators.required]); 
        }
             this.form.controls.Campus.updateValueAndValidity();
             this.form.controls.AreaInteres.updateValueAndValidity();
             this.form.controls.Nivel.updateValueAndValidity();
             this.form.controls.Modalidad.updateValueAndValidity();
             this.form.controls.Carrera.updateValueAndValidity();
             this.form.controls.Ciclo.updateValueAndValidity();
        
    }

    onValueCampus(value) {
        
        this.form.controls.TelefonoCorreo.clearValidators();
        if(value==1){
             this.form.controls.TelefonoCorreo.setValidators([Validators.minLength(10),Validators.maxLength(10)]);
        }else{
              
             this.form.controls.TelefonoCorreo.setValidators([LandingValidation.emailMaloValidator()]);
        }
             this.form.controls.TelefonoCorreo.updateValueAndValidity();
    }

    addValidation(isChecked)
    {
        if(isChecked.checked){          
            this.form.controls.CorreoElectronico.reset({value: '', disabled: true});        
        }else{
            this.form.controls.CorreoElectronico.reset({value: '', disabled: false});                    
        } 
         this.form.controls.CorreoElectronico.updateValueAndValidity(); 
    }

    private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '180px',
          width: '500px',
          data: {message: message}
        });
      }
    
}