import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ClientesService} from '../clientes.service'
@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {

  public formGroup: FormGroup;
  public formGroup2: FormGroup;
 
  constructor(private formBuilder: FormBuilder, protected clientesService:ClientesService) { }


    public genero :any;
    
  ngOnInit() {
    this.llenargenero();
    this.buildForm();
   }
   public llenargenero(){
     this.clientesService.getUsers().subscribe(response => {
       console.log(response);
       this.genero=response;
     })
   }
   private buildForm(){
    this.formGroup = this.formBuilder.group({
      nombre:[''],
      apellido:[''],
      cedula:[''],
      celular:[''],
      correo:[''],
      genero:[''],
      estadoCivil:[''],
    });
    this.formGroup2 = this.formBuilder.group({
      pais:[''],
      departamento:[''],
      ciudad:[''],
      inicioDireccion:[''],
      numeroInicioDireccion:[''],
      numeroDireccion:['']
    });
    
  }
  

}
