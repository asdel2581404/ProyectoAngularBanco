import { Component, OnInit, EventEmitter, Output, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { MatDialog } from '@angular/material';
import { ValidarCedulaControlComponent } from '../validar-cedula-control/validar-cedula-control.component';
import { Persona } from '../modelos/persona';
import { Residencia } from '../modelos/residencia';
@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {
  public modeloInformacionPersonal = new Persona();
  public modeloInformacionResidencia = new Residencia();
  public formGroup: FormGroup;
  public formGroup2: FormGroup;

  constructor(private formBuilder: FormBuilder, protected clientesService: ClientesService,
    public dialog: MatDialog) {

  }



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
    setTimeout(() => {
      this.notify.emit(this.formGroup);
    });
  }

  @Output() public notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public idCiudad: EventEmitter<Number> = new EventEmitter<Number>();
  @Output() public ModeloInformacionPersonal: EventEmitter<Persona> = new EventEmitter<Persona>();
  @Output() public ModeloInformacionResidencia: EventEmitter<Residencia> = new EventEmitter<Residencia>();
  public llenarEstadoCivil() {
    this.clientesService.getUsers().subscribe(response => {
      this.estadoCivil = response;
    })
  }

  validarCedulaControl(control: AbstractControl) {
    
    console.log(control.value)
    if (control.value != null && control.value != "") {
      this.clientesService.getValidarCedula(control.value).subscribe(response => {
       this.ValidarDelitos = response
       
        console.log(response)
      })
    }
    console.log('sitiene',this.ValidarDelitos )
    if (this.ValidarDelitos== true) {
      return { valid: true };
    } else {
      return;
    }

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

    if (this.formGroup2.get('pais').value != null && this.formGroup2.get('pais').value != "") {
      this.clientesService.getDepartamentos(this.formGroup2.get('pais').value).subscribe(response => {
        this.Departamento = response;
        this.LlenarCiudad();
      })

    }

  }

  public LlenarCiudad() {

    if (this.formGroup2.get('departamento').value != null && this.formGroup2.get('departamento').value != "") {
      this.clientesService.getCiudad(this.formGroup2.get('departamento').value).subscribe(response => {
        this.Ciudad = response;
      })
    }

  }




  private buildForm() {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', [Validators.required, this.validarCedulaControl.bind(this)]],
      celular: ['', Validators.required],
      correo: ['', Validators.required],
      genero: ['', Validators.required],
      estadoCivil: ['', Validators.required],
    });
    this.formGroup2 = this.formBuilder.group({
      pais: ['', Validators.required],
      departamento: ['', Validators.required],
      idCiudad: ['', Validators.required],
      inicioDireccion: [''],
      numeroInicioDireccion: [''],
      numeroDireccion: ['']
    });

  }





  validateForm() {
    if (this.formGroup.invalid) {
      this.formGroup.get('nombre').markAsTouched();
      this.formGroup.get('apellido').markAsTouched();
      this.formGroup.get('cedula').markAsTouched();
      this.formGroup.get('celular').markAsTouched();
      this.formGroup.get('genero').markAsTouched();


    }

  }

  submit() {
    console.log(this.formGroup.valid, 'hola')

    if (this.ValidarDelitos == true) {
      let dialogRef = this.dialog.open(ValidarCedulaControlComponent, {
        data: 'Señor usuario hemos encontrado una inhabilidad para poder continuar el proceso, para mas informacion comuniquese al 0180098989',
        width: '30%',
        height: '30%'
      });
      dialogRef.afterClosed().subscribe(response => {
      })
    }

    if (this.formGroup2.valid && this.formGroup.valid && this.ValidarDelitos == false) {

      this.ModeloInformacionPersonal.emit(this.formGroup.value)
      this.modeloInformacionResidencia = this.formGroup2.value;
      this.modeloInformacionResidencia.idCliente = this.formGroup.get('cedula').value;

      this.ModeloInformacionResidencia.emit(this.modeloInformacionResidencia)

    }
    else {
      console.log(this.ValidarDelitos);

    }

  }



}


