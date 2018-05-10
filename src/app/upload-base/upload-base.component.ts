import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';

 import * as XLSX from 'xlsx';

import { SendService } from '../providers/send.service';

@Component({
  selector: 'app-upload-base',
  templateUrl: './upload-base.component.html',
  styleUrls: ['./upload-base.component.scss']
})
export class UploadBaseComponent implements OnInit {
  
  @ViewChild("imgFileInput") imgFileInput: any;
  @ViewChild("Tipo") Tipo: any;

  newdata: any = {};
  form: FormGroup;
  datos: FormControl;
  arrayBuffer:any;
  file:File;
  columDistin:boolean;
  
  constructor(private sendServ: SendService,public dialog: MatDialog) { }

  ngOnInit() {
    this.form = new FormGroup({
      datos: new FormControl(''),
    });
  }

  previewImage(event){  
    console.log(event.srcElement.files[0]); 
     this.newdata.filename = event.srcElement.files[0].name;   
           
  } 

  checkCols(workbook) //your workbook variable 
  { 
      var colValues =[]; 
      var first_sheet_name = workbook.SheetNames[0]; 
      var worksheet = workbook.Sheets[first_sheet_name]; 
      var cells = Object.keys(worksheet); 
      for (var i = 0; i < Object.keys(cells).length; i++) 
      { 
        if( cells[i].indexOf('1') > -1) 
        { 
        colValues.push(worksheet[cells[i]].v);         
        } 
      }
      let col = '["Apellido_Paterno","Apellido_Materno","Nombre","Sexo","Fecha_de_nacimiento","Teléfono_Domicilio","Teléfono_Celular","Correo_Electronico","Calle_y_numero","Entre_calles","colonia","escuela_de_procedencia","fecha_actividad","Actividad","sub_tipo","sub_sub_tipo","calidad","campus","carrera","ciclo","promedio","horario","turno","area_atención","fuente_obtención","nombre corto tlmk","nombre corto tlmk"]';
      let cColum = JSON.stringify(colValues);
    
      if(col == cColum){
        return true;
      }else{
        return false;
      }    
  }
  
  Upload() {
     let x = 0;
     let count = 0;
        
        let tipo = this.Tipo.value;
        
        //this.showDialog("Debe elegir un archivo."); 

        console.log(this.imgFileInput.value);
        
        let fileReader = new FileReader();
        
        console.log(fileReader);

          fileReader.onload = (e) => {

              this.arrayBuffer = fileReader.result;
            
              var data = new Uint8Array(this.arrayBuffer);
            
              var arr = new Array();
            
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            
              var bstr = arr.join("");
            
              var workbook = XLSX.read(bstr, {type:"binary"});
            
              var first_sheet_name = workbook.SheetNames[0];

              var worksheet = workbook.Sheets[first_sheet_name];
              
              let filas = XLSX.utils.sheet_to_json(worksheet,{raw:true});

              let count=  Object.keys(filas).length;

              if(!this.checkCols(workbook)){
                  this.showDialog("Los titulos de la columna no coinciden");                  
                  this.newdata.filename ="";
                  this.Tipo.value="";
                  this.columDistin = false;
                  return;
              }else{
                  this.columDistin = true;
              }
                  let f = 400;
                
                  filas.forEach(key => {
                    let obj2 = {
                       "Prioridad" : 5,
                       "Team" : "C1ATILIC",
                       "Attemp" : 1,
                    };
                    

                    let datos = Object.assign(key, obj2);
                     
                      setTimeout(() => {
                        this.sendServ.sendData(datos)
                          .subscribe(
                            (res: any) => {
                              console.log(res);
                              if (res.status == 200) {
                                x++;                                 
                              }else{
                              }
                            },
                            () => {
                              console.log(x);
                            }
                          )
                      }, f);  
                      
                  });   


                  let total;
                  total = f * count;

                  console.log('X = ' + x);

                  setTimeout(() => {
                    console.log(this.columDistin);
                    if(this.columDistin){
                      //if(count == x){
                          this.showDialog("Los datos se han guardado correctamente.");
                          console.log('guardado ok');
                          this.newdata.filename ="";
                          this.Tipo.value="";
                     // }else{
                     //     this.showDialog("Error al guardar los registros.");
                     //     console.log('guardado NO');
                     //} 
                    }else{
                          console.log('columDistin false');

                    }  
                  }, total);           
          }
          
            fileReader.readAsArrayBuffer(this.imgFileInput.nativeElement.files[0]);

  }

  onSubmit(){
    /*this.sendServ.sendData('http://devmx.com.mx/fmbapp/public/api/sendData',this.form.value)
      .subscribe(
        (res: any) => {
          if (res.status == 200) {           
          } else {
          }
        }
      )*/
      console.log(this.form.value)
  }

   private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '200px',
          width: '500px',
          data: {message: message}
        });
      }

}
