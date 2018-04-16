import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';

import { LandingValidation } from '../validations/landing.validations';

import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Genero } from '../interfaces/genero';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';

import { NivelService } from '../providers/nivel.service';
import { CicloService } from '../providers/ciclo.service';
import { SendService } from '../providers/send.service';
import { CampusService } from '../providers/campus.service';
import { GeneroService } from '../providers/genero.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';
import { ParentescoService } from '../providers/parentesco.service';


@Component({
  selector: 'app-new-register-solo',
  templateUrl: './new-register-solo.component.html',
  styleUrls: ['./new-register-solo.component.scss']
})

export class NewRegisterSoloComponent implements OnInit {
  
  form: FormGroup;
  //maxDate = new Date(2018, this.month.getMonth(),12);
  maxDate = LandingValidation.fechaLimite();
  startDate = LandingValidation.fechaInicio();

  Usuario: FormControl;

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

  ciclos: Ciclo[] = [];
  niveles: Nivel[] = [];
  campus: Campus[] = [];
  generos: Genero[] = [];
  carreras: Carrera[] = [];
  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];
  parentescos: Parentesco[] = [];


  constructor(private gralService: GeneralService, 
              public dialog: MatDialog, 
              private renderer: Renderer2,
              private sendServ: SendService,
              private nivelServ: NivelService,
              private cicloServ: CicloService,
              private campusServ: CampusService,
              private generoServ: GeneroService,
              private carreraServ: CarreraService,
              private interesServ: InteresService,
              private modalidadServ: ModalidadService,
              private parentescoServ: ParentescoService) { }

  ngOnInit() {
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
        
    this.formInit();
  }

  formInit() {
    this.form = new FormGroup({
      Usuario: new FormControl({value: '', disabled: true}, Validators.required),
      
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

  resetForm() {
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

  _keyOnly3letter(event: any, name: any) {
    LandingValidation.letterName(event, name);
  }

  _keyPress(event: any) {
    LandingValidation.onlyNumber(event);
  }

  _keyPressTxt(event: any) {
    LandingValidation.onlyLetter(event);
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
  
  addValidation(isChecked) {
    if (isChecked.checked) {
      this.form.controls.mail.reset({ value: '', disabled: true });
    } else {
      this.form.controls.mail.reset({ value: '', disabled: false });
    }
    this.form.controls.mail.updateValueAndValidity();
  }

  private showDialog(message: string){
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '180px',
      width: '500px',
      data: {message: message}
    });
  }
}
