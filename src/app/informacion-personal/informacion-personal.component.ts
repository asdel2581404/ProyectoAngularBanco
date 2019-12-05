import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClientesService } from '../clientes.service'
@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {

  public formGroup: FormGroup;
  public formGroup2: FormGroup;

  constructor(private formBuilder: FormBuilder, protected clientesService: ClientesService) { }


  public estadoCivil: any;
  public genero: any;
  public Direcciones:any;
  public Pais:any;
  public Departamento:any;
  public Ciudad:any;

  ngOnInit() {
    this.llenarEstadoCivil();
    this.LlenarGenero();
    this.LlenarDireccion();
    this.LlenarPais();
    this.buildForm();
    
  
  }
  public llenarEstadoCivil() {
    this.clientesService.getUsers().subscribe(response => {
      this.estadoCivil = response;
    })
  }

  public LlenarGenero() {
    this.clientesService.getGenero().subscribe(response => {
      this.genero = response;
    })
  }

  public LlenarDireccion(){    
    this.clientesService.getDirecciones().subscribe(response =>{
      this.Direcciones=response;
    })
  }
  public LlenarPais(){    
    this.clientesService.getPais().subscribe(response =>{
      this.Pais=response;
    })
    
  }
  public LlenarDepartamento(){    
    this.clientesService.getDepartamentos(this.formGroup2.get('pais').value).subscribe(response =>{
      this.Departamento=response;
    })
    
  }

  public LlenarCiudad(){    
    this.clientesService.getCiudad(this.formGroup2.get('departamento').value).subscribe(response =>{
      this.Ciudad=response;
    })
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      cedula: [''],
      celular: [''],
      correo: [''],
      genero: [''],
      estadoCivil: [''],
    });
    this.formGroup2 = this.formBuilder.group({
      pais: [''],
      departamento: [''],
      ciudad: [''],
      inicioDireccion: [''],
      numeroInicioDireccion: [''],
      numeroDireccion: ['']
    });

  }

 




}


