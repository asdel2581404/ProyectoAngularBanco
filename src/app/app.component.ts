import { Component,ViewEncapsulation, OnInit, COMPILER_OPTIONS } from '@angular/core';
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
export class AppComponent implements OnInit {
  HayPersona:boolean=false;
  title = 'VinculacionDigital';
  isLinear = false;
  myFormGroup: FormGroup;
  ecoformGroup: FormGroup;
  ModeloInformacionPersonal:Persona;
  modeloInformacionEconomica:Economica;
  modeloInformacionResidecia:Residencia;
  onNotify(formGroup: FormGroup): void {
      this.myFormGroup = formGroup;
  }

  onNotify2(formGroup: FormGroup): void {
    this.ecoformGroup = formGroup;
}

onNotifyInformacionPersonal(ModeloInformacionPersonal:Persona ):void{
  this.ModeloInformacionPersonal=ModeloInformacionPersonal;
  console.log(this.ModeloInformacionPersonal)
  
  
}

onNotifyInformacionResidencia(modeloInformacionResidencia: Residencia):void{
  this.modeloInformacionResidecia=modeloInformacionResidencia;

  console.log(this.modeloInformacionResidecia)
  
}

onNotifyInformacionEconomica(ModeloInformacionEconmica:Economica ):void{
  this.modeloInformacionEconomica=ModeloInformacionEconmica;
  console.log(this.modeloInformacionEconomica);
  this.HayPersona= true;
}



  ngOnInit() {}


}
