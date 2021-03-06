import { Component,ViewEncapsulation, OnInit, COMPILER_OPTIONS, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Persona} from '../app/modelos/persona'
import {Residencia} from '../app/modelos/residencia'
import {Economica} from '../app/modelos/economica'
@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges {

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
  HayPersona:boolean=false;
  
  title = 'VinculacionDigital';
  isLinear = false;
  myFormGroup: FormGroup;
  ecoformGroup: FormGroup;
  myFormgrup2:FormGroup;
  ModeloInformacionPersonal:Persona;
  modeloInformacionEconomica:Economica;
  modeloInformacionResidecia:Residencia;
  idCiudad:Number;
  
  onNotify(formGroup: FormGroup): void {
      this.myFormGroup = formGroup;
  }

  onNotify2(formGroup: FormGroup): void {
    this.ecoformGroup = formGroup;
    
}




  
  
onNotifyInformacionPersonal(ModeloInformacionPersonal:Persona ):void{
  this.ModeloInformacionPersonal=ModeloInformacionPersonal;
  
  
  
}

onNotifyInformacionResidencia(modeloInformacionResidencia: Residencia):void{
  this.modeloInformacionResidecia=modeloInformacionResidencia;

  
  
}

onNotifyInformacionEconomica(ModeloInformacionEconmica:Economica ):void{
  this.modeloInformacionEconomica=ModeloInformacionEconmica;
  
  this.HayPersona= true;
}

onNotifyIdCiudad(idCiudad ):void{
  this.idCiudad=idCiudad;
 
}

  ngOnInit() {}


}
