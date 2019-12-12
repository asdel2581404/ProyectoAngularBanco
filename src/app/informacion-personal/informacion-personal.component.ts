import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { MatDialog } from '@angular/material';
import { ValidarCedulaControlComponent } from '../validar-cedula-control/validar-cedula-control.component';
import {Persona} from '../modelos/persona';
@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {
  public  modeloInformacionPersonal=new Persona();
  
  public formGroup: FormGroup;
  public formGroup2: FormGroup;

  constructor(private formBuilder: FormBuilder, protected clientesService: ClientesService,
    public dialog: MatDialog) { }


  public estadoCivil: any;
  public genero: any;
  public Direcciones: any;
  public Pais: any;
  public Departamento: any;
  public Ciudad: any;
  public ValidarDelitos: any;

  ngOnInit() {
    this.buildForm();
    this.llenarEstadoCivil();
    this.LlenarGenero();
    this.LlenarDireccion();
    this.LlenarPais();



  }
  @Output() public notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();



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

  public LlenarDireccion() {
    this.clientesService.getDirecciones().subscribe(response => {
      this.Direcciones = response;
    })
  }
  public LlenarPais() {
    this.clientesService.getPais().subscribe(response => {
      this.Pais = response;
    })


  }
  public LlenarDepartamento() {

    if (this.formGroup2.get('pais').value != null) { }
    this.clientesService.getDepartamentos(this.formGroup2.get('pais').value).subscribe(response => {
      this.Departamento = response;
    })
    this.LlenarCiudad();
  }

  public LlenarCiudad() {
    this.clientesService.getCiudad(this.formGroup2.get('departamento').value).subscribe(response => {
      this.Ciudad = response;
    })
  }




  private buildForm() {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required],
      genero: ['', Validators.required],
      estadoCivil: ['', Validators.required],
    });
    this.formGroup2 = this.formBuilder.group({
      pais: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: [''],
      inicioDireccion: [''],
      numeroInicioDireccion: ['', Validators.required],
      numeroDireccion: ['', Validators.required]
    });

  }
  submit() {


    if (this.formGroup2.valid && this.formGroup.valid && this.ValidarDelitos ==false) {
      this.notify.emit(this.formGroup);
      this.modeloInformacionPersonal=this.formGroup.value;
      console.log(this.modeloInformacionPersonal);
    }
    else {
     
    }
  }

  ValidarCedula() {

    this.clientesService.getValidarCedula(this.formGroup.get('cedula').value).subscribe(response => {
      this.ValidarDelitos = response;

      if (this.ValidarDelitos != false) {

        let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
          data: 'Señor usuario hemos encontrado una inhabilidad para poder continuar el proceso, para mas informacion comuniquese al 0180098989',
          width: '30%',
          height: '30%'
        });
        dialogRef.afterClosed().subscribe(response => {
          console.log(response);
        })

      }






    })


  }


}


