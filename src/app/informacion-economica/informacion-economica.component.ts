import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ClientesService} from '../clientes.service'
@Component({
  selector: 'app-informacion-economica',
  templateUrl: './informacion-economica.component.html',
  styleUrls: ['./informacion-economica.component.css']
})
export class InformacionEconomicaComponent implements OnInit {
  public formGroup: FormGroup;
  private otroPais:boolean=false;
  constructor(private formBuilder: FormBuilder, protected clientesService:ClientesService ) { }
  
  public Ocupacion:any;
  public GastosMensuales:any;

  ngOnInit() {
    this.buildForm();
    this.llenarOcupacion();
    this.llenarGastos();
    console.log(this.formGroup.value);
  }

  
  public llenarOcupacion(){
    this.clientesService.getOcupacion().subscribe(response => {
      this.Ocupacion=response;
    })}

    public llenarGastos(){
      this.clientesService.getGastos().subscribe(response => {
        this.GastosMensuales=response;

      })
    }
    

  private buildForm(){
   this.formGroup = this.formBuilder.group({
     ocupacion:[''],
    ciiu:[''],
    ventasAnuales:[''],
    totalIngresosMensuales:[''],
    paisOrigenIngreson:[''],
    gastosMesuales:[''],
    activos:[''],
    pasivos:[''],
    tributarOtroPais:[''],
    declaranteRenta:[''],
    monedaExtranjera:['']  
   });
   
  }
  public ValidarOtroPais(value){
    
    console.log(value)
      if(value=='si'){
         this.otroPais=true;
      }else
      this.otroPais=false;

  } 

}
